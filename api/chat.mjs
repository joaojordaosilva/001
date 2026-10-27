import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// 1. Usando a estrutura correta (req, res) exigida pela Vercel
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido." });
  }

  try {
    // 2. Extraindo os dados corretamente sem usar o request.json() que dava erro
    const { mensagem, historico = [] } = req.body;

    if (!mensagem || !mensagem.trim()) {
      return res.status(400).json({ erro: "Mensagem vazia." });
    }

    const resposta = await gerarRespostaIA(mensagem, historico);

    return res.status(200).json(resposta);

  } catch (erro) {
    console.error("=================================");
    console.error("ERRO NO CHATBOT:");
    console.error(erro);
    console.error("=================================");

    return res.status(500).json({
      resolvido: false,
      resposta: "Não consegui consultar o assistente neste momento.\n\nPor segurança, recomendo procurar a Secretaria ou a Coordenação do curso.",
      setor: "Secretaria"
    });
  }
}

async function gerarRespostaIA(mensagem, historico) {
  const contextoHistorico = historico
    .slice(-6)
    .map(msg => `${msg.remetente}: ${msg.texto}`)
    .join("\n");

  const prompt = `
Você é o assistente virtual oficial do GIC (Guia do Ingressante em Computação).
Seu objetivo é ajudar alunos ingressantes do curso de Computação.

REGRAS IMPORTANTES:
1. Nunca invente informações.
2. Se você tiver segurança suficiente para responder, responda de maneira clara e objetiva.
3. Se a pergunta depender de uma informação institucional que você não conhece ou não consegue confirmar, considere que a dúvida NÃO foi resolvida.
4. Quando não conseguir resolver a dúvida, indique o setor que o aluno deve procurar.
5. Os setores permitidos são: Secretaria, Coordenação do curso, Assistência Estudantil, Departamento responsável, Professor/Docente.

HISTÓRICO RECENTE:
${contextoHistorico || "Nenhum histórico disponível."}

NOVA PERGUNTA DO ALUNO:
${mensagem}
`;

  const schema = {
    type: "object",
    properties: {
      resolvido: {
        type: "boolean",
        description: "Indica se a IA conseguiu responder a dúvida com segurança."
      },
      resposta: {
        type: "string",
        description: "Resposta que será apresentada ao aluno."
      },
      setor: {
        type: "string",
        enum: [
          "Nenhum",
          "Secretaria",
          "Coordenação do curso",
          "Assistência Estudantil",
          "Departamento responsável",
          "Professor/Docente"
        ],
        description: "Setor que o aluno deve procurar caso a dúvida não tenha sido resolvida."
      }
    },
    required: ["resolvido", "resposta", "setor"]
  };

  const response = await ai.models.generateContent({
    // 3. O modelo 3.8 que a Google exige, como o Josivaldo tinha feito no início!
    model: "gemini-3.8-flash", 
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  console.log("Resposta recebida do Gemini:");
  console.log(response.text);

  return JSON.parse(response.text);
}