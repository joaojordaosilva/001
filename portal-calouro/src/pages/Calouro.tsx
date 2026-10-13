import { useEffect } from 'react';

/* =====================================================================
   DADOS DA PÁGINA DO CALOURO
   ===================================================================== */
const SECOES = [
  {
    id: "sistemas", icone: "🖥️", nome: "Sistemas e burocracia",
    intro: "SIGAA, DRCA e NTI: onde resolver cada coisa logo nas primeiras semanas.",
    cards: [
      { t: "Matrícula Institucional x Matrícula Acadêmica",
        p: "A **Institucional** é a entrega de documentos (hoje geralmente online) logo depois que você passa no SiSU. A **Acadêmica** é o seu vínculo com as disciplinas, feito no SIGAA a cada novo semestre.",
        li: ["No **1º período** as matérias já vêm definidas: você não precisa se matricular nas disciplinas agora.", "A partir do **2º semestre**, é você quem monta a própria grade."],
        link: "" },
      { t: "Notas, faltas e horários",
        p: "O **SIGAA** é o sistema principal. É por ele que você acompanha suas turmas, notas e faltas, e emite os documentos mais pedidos no campus.",
        li: ["**Atestado de Matrícula**: necessário para quase tudo na universidade.", "**Histórico Escolar Analítico**."],
        link: "" },
      { t: "E-mail institucional e Wi-Fi da UFAL",
        p: "Gerenciados pelo **NTI** (Núcleo de Tecnologia da Informação). Você precisa criar suas credenciais de rede para ter o e-mail institucional e conectar seus dispositivos à rede sem fio **Eduroam**.",
        link: "" },
      { t: "Trancamento de curso ou disciplina",
        p: "O pedido é feito à **coordenação do curso**, por formulário, dentro do prazo do Calendário Acadêmico. O curso pode ficar trancado por no máximo **4 semestres (2 anos)**.",
        link: "" },
      { t: "Quem resolve o quê?", wide: true,
        p: "Saber a quem recorrer evita idas e vindas na primeira semana:",
        li: ["**DRCA**: registro acadêmico e diploma.", "**NTI**: sistemas e internet.", "**Coordenação do curso**: ajustes de grade e trancamento."] }
    ]
  },
  {
    id: "email-ic", icone: "✉️", nome: "E-mail institucional do IC",
    intro: "O IC tem infraestrutura de TI própria, independente da reitoria, então os alunos de Computação têm credenciais específicas.",
    cards: [
      { t: "Para que serve o e-mail @ic.ufal.br",
        p: "Não é só uma caixa de entrada: é a credencial para **logar nos computadores dos laboratórios** (que rodam distribuições Linux) e acessar redes e servidores internos do instituto e o Wi-Fi do IC.",
        link: "" },
      { t: "Como criar",
        p: "A solicitação costuma ser feita **no início do semestre** ao Setor de TI do IC. Leve o **Atestado de Matrícula do SIGAA** para comprovar o vínculo e receber suas credenciais.",
        link: "" },
      { t: "Vantagens de ter um e-mail .edu.br / .ufal.br", wide: true,
        p: "Para quem faz Computação, esta é a informação mais valiosa: o e-mail institucional libera dezenas de ferramentas profissionais gratuitas.",
        li: ["**GitHub Student Developer Pack**: GitHub Copilot, domínios gratuitos por um ano, servidores e dezenas de serviços para desenvolvimento.",
             "**JetBrains**: licenças originais e gratuitas das melhores IDEs (IntelliJ IDEA para Java, PyCharm, WebStorm).",
             "**Microsoft Azure e AWS Educate**: créditos de nuvem (hospedagem, banco de dados, máquinas virtuais), fundamentais em Redes e Sistemas Distribuídos.",
             "**Design**: Notion Premium, Figma for Education e Canva Pro, ótimos para seminários e prototipação.",
             "**Drive educacional**: a conta costuma ser vinculada ao Google Workspace, com bem mais espaço que uma conta pessoal gratuita."],
        link: "" }
    ]
  },
  {
    id: "regras", icone: "⚖️", nome: "As regras do jogo",
    intro: "Notas, faltas e oportunidades: entenda o sistema de avaliação desde o dia 1 para não passar sufoco no fim do semestre.",
    cards: [
      { t: "Avaliação: AB1, AB2 e Reavaliação", wide: true,
        p: "O semestre tem duas notas, a **AB1** e a **AB2**. O professor decide como compô-las (provas, listas do Huxley, trabalhos...), mas a conta final é sempre a mesma:",
        stats: [{ n: "≥ 7,0", d: "média de AB1 e AB2: aprovado direto" }, { n: "< 5,0", d: "reprovado por nota, sem recuperação" }, { n: "5,0 a 6,9", d: "vai para a Reavaliação" }, { n: "≥ 5,5", d: "nova média exigida após a Reavaliação" }],
        p2: "A Reavaliação é uma prova de todo o conteúdo do semestre, e a nota dela **substitui a sua menor AB**.",
        link: "" },
      { t: "Limite de faltas: a regra dos 25%",
        p: "Você precisa de **75% de presença** em cada disciplina. Em uma disciplina de 60 horas (geralmente 2 encontros por semana) só pode faltar **15 horas**, ou seja, cerca de 7 faltas no semestre.",
        li: ["**Reprovação por Falta (RF)**: estourou o limite, está reprovado, mesmo com 10 em todas as provas.", "Quem reprova por falta **perde o direito à Reavaliação**."],
        link: "" },
      { t: "Monitoria: seu maior salva-vidas",
        p: "Monitores são veteranos que cursaram a disciplina com excelência e ajudam o professor. Têm horários no IC para tirar dúvidas, ajudar com as listas do Huxley e revisar antes das provas. As matérias iniciais (Matemática Discreta, P1, Cálculo) são densas: não tenha vergonha de procurá-los!",
        li: ["**Como virar monitor**: a partir do 2º período, com nota alta em uma matéria, você pode concorrer nos editais. Pode ser remunerada (bolsa) ou voluntária."],
        link: "" },
      { t: "Horas complementares e extensão", wide: true,
        p: "Para pegar o diploma não basta passar nas disciplinas da grade: é preciso viver a universidade.",
        li: ["**Atividades Complementares (Horas Flexíveis)**: eventos de tecnologia, maratonas de programação, semanas acadêmicas, artigos, cursos de idiomas, estágio. Guarde todos os certificados em uma pasta na nuvem desde o 1º período!",
             "**Projetos de Extensão**: com a curricularização da extensão, todos os cursos exigem projetos que levem conhecimento à sociedade, como ensinar programação em escolas públicas ou criar sistemas para ONGs."],
        link: "" },
      { t: "Dica de Veterano", wide: true,
        tip: "Acompanhe os murais do IC e os grupos de WhatsApp das turmas. Sempre que surgir edital de **Extensão**, **Iniciação Científica (PIBIC)** ou **Monitoria**, tente participar. Além de adiantar horas obrigatórias, é nesses projetos que você faz networking com professores e colegas, o que abre portas no mercado." }
    ]
  },
  {
    id: "campus", icone: "🏫", nome: "Sobrevivência no Campus A.C. Simões",
    intro: "Alimentação, livros e saúde no dia a dia da universidade.",
    cards: [
      { t: "Restaurante Universitário (RU)",
        p: "Almoço e jantar custam **R$ 3,00** para estudantes de graduação. Leve o **comprovante de matrícula atualizado** e um **documento com foto**. O cardápio do dia costuma sair no Instagram oficial da Ufal (@ufaloficial).",
        link: "" },
      { t: "Biblioteca Central (BC)",
        p: "O empréstimo é gratuito com o cadastro do SIGAA. Atrasos geram multa diária, paga obrigatoriamente via **GRU** (Guia de Recolhimento da União).",
        li: ["Atenção: **débitos pendentes na biblioteca impedem a colação de grau**."],
        link: "" },
      { t: "Atendimento médico",
        p: "Os estudantes podem agendar consultas no **Hospital Universitário (HU)** apresentando o comprovante de matrícula autenticado pelo DRCA e um documento oficial.",
        link: "" }
    ]
  },
  {
    id: "assistencia", icone: "🤝", nome: "Assistência estudantil",
    intro: "Apoio para permanecer na universidade.",
    cards: [
      { t: "PROEST: isenção no RU, bolsas e residência", wide: true,
        p: "Estudantes em situação de vulnerabilidade social podem pedir **isenção no RU** e concorrer a bolsas pelos editais da **PROEST** (Pró-Reitoria Estudantil). A PROEST também gerencia a **Residência Universitária** e bolsas de apoio.",
        link: "" }
    ]
  },
  {
    id: "vamu", icone: "🚌", nome: "Carteira VAMU",
    intro: "Em Maceió, o Passe Livre Estudantil garante viagens gratuitas nos ônibus urbanos (com limite mensal de embarques) para ir e voltar da universidade.",
    cards: [
      { t: "Como solicitar pela primeira vez",
        p: "Reúna os documentos:",
        li: ["RG e CPF", "Comprovante de residência (validade de até 3 meses)", "Foto 3x4 atual", "Atestado de Matrícula atualizado"],
        p2: "O cadastro e o agendamento são feitos no **site oficial do VAMU Maceió**; a retirada é nos postos físicos (como no Centro ou em terminais de integração).",
        link: "" },
      { t: "Atestado do SIGAA e recadastramento",
        p: "O VAMU é rigoroso com a documentação.",
        li: ["O Atestado de Matrícula do SIGAA deve ter **assinatura digital ou código de verificação** (emitido automaticamente).",
             "O benefício **não é vitalício**: a cada início de ano letivo, envie o comprovante do novo semestre no site e pague a taxa de recadastramento (geralmente PIX ou boleto). Sem revalidar, o cartão é bloqueado."],
        link: "" },
      { t: "Meia-entrada cultural", wide: true,
        p: "A carteira VAMU **não vale como documento nacional do estudante** para meia-entrada em cinemas e shows. Para eventos culturais, emita a carteira da **UNE** ou use o aplicativo **ID Jovem** (se for elegível).",
        link: "" }
    ]
  },
  {
    id: "p1", icone: "🚀", nome: "Primeiro período: o desafio de P1",
    intro: "A grade do 1º semestre constrói a sua base. Uma das disciplinas mais importantes (e a primeira grande paixão ou dor de cabeça dos calouros) é Programação 1.",
    cards: [
      { t: "A linguagem C",
        p: "Em P1 você mergulha nos fundamentos da lógica de programação com **C**. Se nunca escreveu uma linha de código, não se assuste: as aulas começam do zero. Você vai lidar com variáveis, laços de repetição e os famosos **ponteiros**. Dominar C agora facilita aprender qualquer outra linguagem depois.",
        link: "" },
      { t: "Pratique no The Huxley",
        p: "O Huxley é um **juiz online** muito usado pelos professores do IC para passar listas de exercícios. Há centenas de problemas por nível de dificuldade: você escreve o código em C, envia na plataforma e ela testa automaticamente se a lógica está correta. Ótimo para treinar para as provas e pegar a sintaxe.",
        link: "" },
      { t: "Dica de Veterano", wide: true,
        tip: "Não espere a primeira lista da faculdade sair. Crie sua conta no Huxley, procure os problemas de **nível 1** e comece a brincar com C. A prática constante é o único segredo para passar direto em P1!" }
    ]
  },
  {
    id: "dev", icone: "🛠️", nome: "Ambiente de desenvolvimento: VS Code e Terminal",
    intro: "A ferramenta oficial dos professores é o Visual Studio Code, um editor leve, customizável e o mais usado no mercado. Nas aulas do IC, o código em C costuma ser compilado e executado direto no Terminal do Windows.",
    cards: [
      { t: "Compilar e executar C no Terminal", wide: true,
        p: "O Windows não vem com compilador de C: instale o **GCC (via MinGW)**. Em geral os professores ensinam na primeira semana. Com ele instalado, o dia a dia é assim:",
        li: ["**1. Escreva e salve** o código no VS Code com a extensão `.c` (ex.: `meu_programa.c`), em uma pasta fácil de achar.",
             "**2. Abra o terminal** no próprio VS Code: Terminal > Novo Terminal (ou `Ctrl + '`).",
             "**3. Compile** com o comando abaixo (`-o` define o nome do executável):",
             "**4. Execute** o programa gerado:"],
        code: "gcc meu_programa.c -o meu_programa\n.\\meu_programa.exe",
        tip: "A **seta para cima** repete comandos anteriores. Alterou o código? Salve (**Ctrl + S**), compile de novo e só então execute. Se esquecer de compilar, você roda a versão velha!",
        link: "" }
    ]
  }
];

/* Componente para renderizar texto rico (**negrito** e `código`) */
const TextoRico = ({ texto }: { texto: string }) => {
  if (!texto) return null;
  const partes = texto.split(/(\*\*[^*]+\*\*|`[^`]+`)/);
  return (
    <>
      {partes.map((parte, index) => {
        if (parte.startsWith('**') && parte.endsWith('**')) {
          return <b key={index}>{parte.slice(2, -2)}</b>;
        }
        if (parte.startsWith('`') && parte.endsWith('`')) {
          return <code key={index}>{parte.slice(1, -1)}</code>;
        }
        return <span key={index}>{parte}</span>;
      })}
    </>
  );
};

/* Componente para a "Dica de Veterano" */
const DicaVeterano = ({ texto }: { texto: string }) => (
  <div className="tip">
    <span className="em">💡</span>
    <div>
      <b>Dica de Veterano: </b>
      <TextoRico texto={texto} />
    </div>
  </div>
);

/* =====================================================================
   PÁGINA PRINCIPAL
   ===================================================================== */
export default function Calouro() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-calouro">
      <div className="page-hero">
        <div className="wrap">
          <h1>Bem-vindo, calouro!</h1>
          <p>O essencial para começar a vida académica no Instituto de Computação: sistemas, regras de nota e falta, vida no campus, carteirinha e os primeiros passos em programação. Nos cartões com “Saiba mais” há um tutorial passo a passo.</p>
          <nav className="jump" aria-label="Ir para um assunto">
            {SECOES.map((s) => (
              <a key={s.id} href={`#${s.id}`}>{s.nome.split(":")[0]}</a>
            ))}
          </nav>
        </div>
      </div>

      <main className="calouro-main">
        {SECOES.map((secao) => (
          <section className="sec" id={secao.id} key={secao.id}>
            <div className="sec__head">
              <span className="sec__ico">{secao.icone}</span>
              <h2>{secao.nome}</h2>
            </div>
            <p className="sec__intro">{secao.intro}</p>
            
            <div className="grid">
              {secao.cards.map((card, idx) => (
                <article className={`card ${card.wide ? 'wide' : ''}`} key={idx}>
                  {/* Se for APENAS uma dica (sem parágrafos ou listas) */}
                  {card.tip && !card.p && !card.li ? (
                    <DicaVeterano texto={card.tip} />
                  ) : (
                    <>
                      <h3>{card.t}</h3>
                      {card.p && <p><TextoRico texto={card.p} /></p>}
                      
                      {card.stats && (
                        <div className="stats">
                          {card.stats.map((st, i) => (
                            <div className="stat" key={i}>
                              <b>{st.n}</b>
                              <span>{st.d}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {card.li && (
                        <ul>
                          {card.li.map((item, i) => (
                            <li key={i}><TextoRico texto={item} /></li>
                          ))}
                        </ul>
                      )}
                      
                      {card.p2 && <p><TextoRico texto={card.p2} /></p>}
                      {card.code && <pre className="code">{card.code}</pre>}
                      {card.tip && <DicaVeterano texto={card.tip} />}

                      {typeof card.link === "string" && (
                        <>
                          <div className="spacer"></div>
                          <a 
                            className="btn-more" 
                            href={card.link || "#"} 
                            onClick={(e) => !card.link && e.preventDefault()}
                            title={!card.link ? "Link ainda não definido" : undefined}
                          >
                            Saiba mais
                          </a>
                        </>
                      )}
                    </>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}