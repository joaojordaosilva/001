import OpenAI from "openai";
// 1. Importamos o texto diretamente como uma variável do JavaScript
import { baseDeConhecimento } from "./base_conhecimento.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido." });
  }

  try {
    const { mensagem, historico = [] } = req.body;

    if (!mensagem || !mensagem.trim()) {
      return res.status(400).json({ erro: "Mensagem vazia." });
    }

    const resposta = await gerarRespostaIA(mensagem, historico);

    return res.status(200).json(resposta);

  } catch (erro) {
    console.error("ERRO NO CHATBOT (OpenAI):", erro);
    return res.status(500).json({
      resolvido: false,
      resposta: "Não consegui consultar o assistente neste momento.\n\nPor segurança, recomendo procurar a Secretaria ou a Coordenação do curso.",
      setor: "Secretaria"
    });
  }
}

async function gerarRespostaIA(mensagem, historico) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const contextoHistorico = historico
    .slice(-6)
    .map(msg => `${msg.remetente}: ${msg.texto}`)
    .join("\n");

  // 2. A variável baseDeConhecimento já está disponível aqui, sem precisar do 'fs'
  const promptSistema = `
Você é o assistente virtual oficial do GIC (Guia do Ingressante em Computação) do Instituto de Computação (IC) da UFAL.
Seu objetivo é ajudar alunos ingressantes do curso de Computação.

REGRA DE OURO: Você é EXCLUSIVO para assuntos do IC, do curso de Ciência da Computação e da vida universitária. 
Se o aluno perguntar sobre assuntos fora deste escopo (futebol, receitas, etc), recuse educadamente.

REGRAS IMPORTANTES:
1. Baseie a sua resposta ESTRITAMENTE na BASE DE CONHECIMENTO INSTITUCIONAL abaixo.
2. Nunca invente informações. Se a informação não constar na base, considere que a dúvida NÃO foi resolvida.
3. Se você tiver segurança suficiente para responder, responda de maneira clara e objetiva.
4. Quando não conseguir resolver a dúvida, indique o setor que o aluno deve procurar.
5. Os setores permitidos são: Secretaria, Coordenação do curso, Assistência Estudantil, Departamento responsável, Professor/Docente.

BASE DE CONHECIMENTO INSTITUCIONAL:
${baseDeConhecimento}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: promptSistema },
      { role: "user", content: `HISTÓRICO RECENTE:\n${contextoHistorico || "Nenhum histórico disponível."}\n\nNOVA PERGUNTA DO ALUNO:\n${mensagem}` }
    ],
    temperature: 0.1, 
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "resposta_assistente",
        strict: true,
        schema: {
          type: "object",
          properties: {
            resolvido: { type: "boolean" },
            resposta: { type: "string" },
            setor: {
              type: "string",
              enum: [
                "Nenhum", 
                "Secretaria", 
                "Coordenação do curso", 
                "Assistência Estudantil", 
                "Departamento responsável", 
                "Professor/Docente"
              ]
            }
          },
          required: ["resolvido", "resposta", "setor"],
          additionalProperties: false
        }
      }
    }
  });

  return JSON.parse(response.choices[0].message.content);
}