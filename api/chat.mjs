import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        erro: "Método não permitido."
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  try {
    const { mensagem, historico = [] } = await request.json();

    if (!mensagem || !mensagem.trim()) {
      return new Response(
        JSON.stringify({
          erro: "Mensagem vazia."
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const resposta = await gerarRespostaIA(
      mensagem,
      historico
    );

    return new Response(
      JSON.stringify(resposta),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (erro) {

    console.error("=================================");
    console.error("ERRO NO CHATBOT:");
    console.error(erro);
    console.error("=================================");

    return new Response(
      JSON.stringify({
        resolvido: false,
        resposta:
          "Não consegui consultar o assistente neste momento.\n\n" +
          "Por segurança, recomendo procurar a Secretaria " +
          "ou a Coordenação do curso.",
        setor: "Secretaria"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}


async function gerarRespostaIA(mensagem, historico) {

  const contextoHistorico = historico
    .slice(-6)
    .map(
      msg => `${msg.remetente}: ${msg.texto}`
    )
    .join("\n");

  const prompt = `
Você é o assistente virtual oficial do GIC
(Guia do Ingressante em Computação).

Seu objetivo é ajudar alunos ingressantes do curso de Computação.

Você pode responder dúvidas relacionadas a:

- matrícula;
- disciplinas;
- SIGAA;
- faltas e frequência;
- provas;
- histórico;
- atestado de matrícula;
- bolsas;
- PIBIC;
- pesquisa;
- extensão;
- oportunidades acadêmicas;
- funcionamento do curso;
- informações apresentadas pelo GIC.

REGRAS IMPORTANTES:

1. Nunca invente informações.

2. Se você tiver segurança suficiente para responder,
responda de maneira clara e objetiva.

3. Se a pergunta depender de uma informação institucional
que você não conhece ou não consegue confirmar,
considere que a dúvida NÃO foi resolvida.

4. Quando não conseguir resolver a dúvida, indique o setor
que o aluno deve procurar.

5. Os setores permitidos são:

- Secretaria
- Coordenação do curso
- Assistência Estudantil
- Departamento responsável
- Professor/Docente

6. Não diga que uma informação é oficial se você não tiver
certeza disso.

7. Se a pergunta for ambígua e não houver informação
suficiente, considere a dúvida não resolvida.

8. A resposta deve ser adequada para um aluno ingressante.

9. Não invente telefones, e-mails, horários ou endereços.

10. Responda sempre em português do Brasil.

11. Se você conseguir responder a dúvida geral com segurança,
não encaminhe o aluno para a Secretaria desnecessariamente.

12. Se você não souber a resposta específica da universidade,
considere a dúvida não resolvida e indique o setor mais adequado.

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
        description:
          "Indica se a IA conseguiu responder a dúvida com segurança."
      },

      resposta: {
        type: "string",
        description:
          "Resposta que será apresentada ao aluno."
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

        description:
          "Setor que o aluno deve procurar caso a dúvida não tenha sido resolvida."
      }

    },

    required: [
      "resolvido",
      "resposta",
      "setor"
    ]
  };


  const response = await ai.models.generateContent({

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