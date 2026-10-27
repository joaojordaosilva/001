import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

/*
|--------------------------------------------------------------------------
| BASE DE CONHECIMENTO DO GIC
|--------------------------------------------------------------------------
|
| Coloque aqui informações oficiais que o chatbot deve conhecer.
|
| IMPORTANTE:
| Não coloque informações que você não tenha confirmado.
|
*/

const baseConhecimentoGIC = `
INFORMAÇÕES GERAIS DO GIC

O GIC significa "Guia do Ingressante em Computação".

O sistema tem como objetivo ajudar alunos ingressantes do curso de
Computação, oferecendo orientações sobre a vida acadêmica, matrícula,
disciplinas, bolsas, pesquisa, extensão e outras informações úteis.

SIGAA:
O SIGAA é o sistema acadêmico utilizado para atividades como
acompanhamento da vida acadêmica, disciplinas e informações relacionadas
ao vínculo do estudante.

Quando o aluno perguntar sobre um procedimento específico dentro do
SIGAA, não invente o caminho de menus ou opções caso essa informação
não esteja cadastrada na base de conhecimento.

VAMU:
O GIC possui informações relacionadas à carteira VAMU.
Caso o aluno pergunte por um procedimento específico para solicitar,
renovar ou utilizar a carteira, somente informe o procedimento se ele
estiver cadastrado nesta base.

PIBIC:
PIBIC está relacionado ao Programa Institucional de Bolsas de
Iniciação Científica.
Caso o aluno pergunte sobre inscrição, prazos, quantidade de bolsas
ou regras específicas da instituição, não invente informações.

BOLSAS:
O GIC pode orientar sobre oportunidades de bolsas e assistência
estudantil.
Para informações específicas sobre editais, valores, prazos ou
documentação, somente responda se a informação estiver disponível
nesta base.

IMPORTANTE:
As informações específicas da universidade devem ser adicionadas
nesta base somente depois de serem confirmadas.
`;


/*
|--------------------------------------------------------------------------
| RESPOSTAS RÁPIDAS
|--------------------------------------------------------------------------
|
| Essas respostas evitam chamar a IA para perguntas simples.
| Isso deixa o chatbot muito mais rápido.
|
*/

function respostaRapida(mensagem) {
  const texto = mensagem
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  /*
  |--------------------------------------------------------------------------
  | SIGAA
  |--------------------------------------------------------------------------
  */

  if (
    texto.includes("o que e o sigaa") ||
    texto.includes("o que e sigaa")
  ) {
    return {
      resolvido: true,
      resposta:
        "O SIGAA é o sistema acadêmico utilizado pelos estudantes para " +
        "acompanhar informações relacionadas à vida acadêmica, como " +
        "disciplinas e vínculo acadêmico.\n\n" +
        "Se você quiser saber como realizar um procedimento específico " +
        "dentro do SIGAA, me diga qual procedimento você precisa fazer.",
      setor: "Nenhum"
    };
  }

  /*
  |--------------------------------------------------------------------------
  | PIBIC
  |--------------------------------------------------------------------------
  */

  if (
    texto.includes("o que e o pibic") ||
    texto.includes("o que e pibic") ||
    texto === "pibic"
  ) {
    return {
      resolvido: true,
      resposta:
        "PIBIC significa Programa Institucional de Bolsas de Iniciação " +
        "Científica. Ele está relacionado à participação de estudantes " +
        "em atividades de pesquisa científica.\n\n" +
        "Se você quiser saber sobre inscrição, editais, prazos ou bolsas " +
        "específicas da sua instituição, posso orientar ou indicar o setor " +
        "responsável.",
      setor: "Nenhum"
    };
  }

  /*
  |--------------------------------------------------------------------------
  | FALTAS
  |--------------------------------------------------------------------------
  */

  if (
    texto.includes("regra de falta") ||
    texto.includes("regras de falta") ||
    texto.includes("quantas faltas") ||
    texto.includes("frequencia") ||
    texto.includes("faltas")
  ) {
    return {
      resolvido: false,
      resposta:
        "As regras de frequência e o limite de faltas podem depender " +
        "das normas da instituição e da disciplina. Para evitar passar " +
        "uma informação incorreta, recomendo confirmar essa regra com " +
        "a Coordenação do curso ou com o professor da disciplina.",
      setor: "Coordenação do curso"
    };
  }

  /*
  |--------------------------------------------------------------------------
  | VAMU
  |--------------------------------------------------------------------------
  */

  if (
    texto.includes("vamu") ||
    texto.includes("carteira vamu")
  ) {
    return {
      resolvido: false,
      resposta:
        "Posso orientar sobre a carteira VAMU, mas não tenho neste momento " +
        "o procedimento institucional confirmado para solicitação ou " +
        "renovação. Para receber a orientação correta, recomendo procurar " +
        "a Secretaria ou o setor responsável pelo atendimento estudantil.",
      setor: "Secretaria"
    };
  }

  return null;
}


/*
|--------------------------------------------------------------------------
| HANDLER DA API
|--------------------------------------------------------------------------
*/

export default async function handler(request) {

  // TESTE: acesso pelo navegador
  if (request.method === "GET") {
    return new Response(
      JSON.stringify({
        status: "ok",
        mensagem: "API do chatbot GIC funcionando!"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

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


    /*
    |--------------------------------------------------------------------------
    | 1. TENTA RESPONDER SEM IA
    |--------------------------------------------------------------------------
    */

    const respostaDireta = respostaRapida(mensagem);

    if (respostaDireta) {

      console.log("Resposta rápida utilizada.");

      return new Response(
        JSON.stringify(respostaDireta),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }


    /*
    |--------------------------------------------------------------------------
    | 2. USA GEMINI
    |--------------------------------------------------------------------------
    */

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
          "Para obter uma orientação segura, recomendo procurar a " +
          "Secretaria ou a Coordenação do curso.",
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


/*
|--------------------------------------------------------------------------
| GEMINI
|--------------------------------------------------------------------------
*/

async function gerarRespostaIA(mensagem, historico) {

  const contextoHistorico = historico
    .slice(-6)
    .map(msg => `${msg.remetente}: ${msg.texto}`)
    .join("\n");


  const prompt = `
Você é o assistente virtual do GIC
(Guia do Ingressante em Computação).

Seu objetivo é ajudar alunos ingressantes do curso de Computação.

REGRAS FUNDAMENTAIS:

1. Responda sempre em português do Brasil.

2. Seja claro, direto e amigável.

3. Não invente informações.

4. Utilize primeiro a BASE DE CONHECIMENTO DO GIC abaixo.

5. Se a resposta estiver na base, utilize essa informação.

6. Se a pergunta pedir uma informação institucional específica que
não esteja na base, NÃO invente.

7. Quando não houver informação suficiente para responder com segurança,
marque "resolvido" como false.

8. Quando "resolvido" for false, indique o setor mais adequado.

9. Os setores permitidos são:

- Secretaria
- Coordenação do curso
- Assistência Estudantil
- Departamento responsável
- Professor/Docente

10. Não invente:
- telefones;
- e-mails;
- endereços;
- horários;
- prazos;
- valores;
- regras institucionais;
- caminhos específicos dentro do SIGAA;
- editais;
- nomes de pessoas.

11. Não encaminhe para a Secretaria quando a pergunta puder ser
respondida com segurança.

12. Se a pergunta for geral e puder ser respondida sem informações
específicas da universidade, responda normalmente.

13. Se o aluno fizer uma pergunta ambígua, peça esclarecimento quando
isso puder resolver a dúvida. Caso contrário, encaminhe para o setor
adequado.

14. As respostas devem ser curtas e adequadas para um chatbot.
Evite respostas excessivamente longas.

BASE DE CONHECIMENTO DO GIC:
${baseConhecimentoGIC}


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
          "Indica se a dúvida foi respondida com segurança."
      },

      resposta: {
        type: "string",
        description:
          "Resposta curta, clara e útil para o aluno."
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
          "Setor que o aluno deve procurar quando a dúvida não puder ser resolvida."
      }
    },

    required: [
      "resolvido",
      "resposta",
      "setor"
    ]
  };


  console.log("Enviando pergunta para o Gemini...");


  const response = await ai.models.generateContent({

    model: "gemini-3.8-flash",

    contents: prompt,

    config: {

      /*
      |--------------------------------------------------------------------------
      | REDUZ O TEMPO DE RACIOCÍNIO
      |--------------------------------------------------------------------------
      */

      thinkingConfig: {
        thinkingLevel: "low"
      },


      /*
      |--------------------------------------------------------------------------
      | RESPOSTA ESTRUTURADA
      |--------------------------------------------------------------------------
      */

      responseMimeType: "application/json",

      responseSchema: schema,


      /*
      |--------------------------------------------------------------------------
      | LIMITA O TAMANHO DA RESPOSTA
      |--------------------------------------------------------------------------
      */

      maxOutputTokens: 500
    }
  });


  console.log("Resposta recebida do Gemini.");

  console.log(response.text);


  return JSON.parse(response.text);
}
