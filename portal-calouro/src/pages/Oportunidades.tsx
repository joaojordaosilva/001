import { useEffect } from 'react';

/* =====================================================================
   DADOS DA PÁGINA DE OPORTUNIDADES
   ===================================================================== */
const GRUPOS = [
  {
    nome: "Instituto de Computação",
    desc: "O que o IC oferece dentro do próprio instituto.",
    pastas: [
      {
        id: "laboratorios",
        nome: "Laboratórios",
        desc: "Principais laboratórios de ensino e infraestrutura do IC.",
        janelas: [
          { titulo: "Laboratórios de Informática", texto: "O IC tem 3 laboratórios de informática, com 70 computadores no total, usados nas aulas de graduação.", img: "", link: "" },
          { titulo: "Laboratório de Controle", texto: "Espaço de ensino e pesquisa em análise e controle de sistemas dinâmicos. Conta com tanques acoplados, pêndulo invertido rotacional duplo, estações com Matlab/Simulink e uma bancada de energia solar fotovoltaica.", img: "", link: "" },
          { titulo: "Laboratório de Robótica e Processamento de Sinais", texto: "Focado em robótica fixa, navegação autônoma, manipulação e visão robótica, com braços manipuladores e plataformas móveis.", img: "", link: "" },
          { titulo: "Laboratório de Eletricidade e Eletrônica", texto: "Tem 9 bancadas de instrumentação, com osciloscópios digitais, fontes CC variáveis, geradores de funções, multímetros e microcomputadores.", img: "", link: "" },
          { titulo: "Laboratório de Sistemas Embarcados", texto: "Reúne kits educacionais de FPGA e microcontroladores (arquiteturas PIC e ARM) para aulas e pesquisas em sistemas digitais.", img: "", link: "" }
        ]
      },
      {
        id: "extensao",
        nome: "Projetos de Extensão",
        desc: "Projetos e programas de extensão do IC UFAL.",
        janelas: [
          { titulo: "TATU (Tecnologia Assistiva no Turismo)", texto: "Projeto interdisciplinar sediado no laboratório TOCA, em parceria com a Faculdade de Letras e o IGDEMA. Desenvolve um aplicativo gratuito com audiodescrição para pessoas com deficiência visual ou auditiva em pontos turísticos de Alagoas, usando Bluetooth/Beacons e GPS.", img: "", link: "" },
          { titulo: "Pós-Carnaval do MusIC", texto: "Projeto musical organizado por estudantes de Ciência da Computação e Engenharia de Computação, ligado à Liga Acadêmica de Computação (LAComp). Promove apresentações temáticas e culturais dentro e fora do instituto.", img: "", link: "" },
          { titulo: "SECOMP (Semana da Computação)", texto: "Evento periódico do programa de extensão do IC, com palestras, minicursos, trilhas temáticas (como Inteligência Artificial, Cibersegurança e Hardware) e competições, como o sumô de robôs da RAS. Aproxima estudantes e comunidade do mercado de tecnologia.", img: "", link: "" },
          { titulo: "Ramo IEEE e Capítulo IEEE RAS", texto: "Atividades de extensão em robótica e automação, voltadas ao desenvolvimento de competências técnicas e de liderança entre os estudantes.", img: "", link: "" },
          { titulo: "Edge Academy", texto: "Projeto de formação avançada de talentos em tecnologia para estudantes dos cursos de computação da UFAL, em parceria com a Softex e o MCTI.", img: "", link: "" }
        ]
      },
      {
        id: "monitoria",
        nome: "Monitoria",
        desc: "Programa de Monitoria da UFAL.",
        janelas: [
          { titulo: "Programa de Monitoria", texto: "O programa geral da UFAL conta com monitores bolsistas e monitores voluntários, que atuam sem bolsa.", img: "", link: "" },
          { titulo: "Valor da bolsa", texto: "O auxílio padrão para bolsistas do programa institucional de monitoria da UFAL é de R$ 400,00 por mês.", img: "", link: "" },
          { titulo: "Editais e inscrição", texto: "Os editais gerais, os manuais e o sistema de inscrições e relatórios são gerenciados pela Página de Monitoria da UFAL e pelo SIGAA - Projetos de Monitoria.", img: "", link: "" }
        ]
      }
    ]
  },
  {
    nome: "UFAL",
    desc: "Apoio e serviços da universidade para todos os estudantes.",
    pastas: [
      {
        id: "assistencia",
        nome: "Assistência Estudantil",
        desc: "Apoio à permanência e ao sucesso acadêmico de estudantes em vulnerabilidade social.",
        janelas: [
          { titulo: "Assistência Estudantil da UFAL", texto: "É gerenciada pela Pró-Reitoria Estudantil (Proest) e, nos campi do interior, pelos Núcleos de Assistência Estudantil (NAE). Seu objetivo é apoiar a permanência e o sucesso acadêmico de estudantes em vulnerabilidade social.", img: "", link: "" },
          { titulo: "Como participar", texto: "É obrigatório fazer o Cadastramento Socioeconômico pelos editais publicados na página de Assistência Estudantil da UFAL. A seleção define o Índice de Vulnerabilidade Socioeconômica (IVS), que estabelece a ordem de prioridade das convocações.", img: "", link: "" },
          { titulo: "Bolsa Pró-Graduando (BPG)", texto: "Apoio financeiro mensal para despesas acadêmicas.", img: "", link: "" },
          { titulo: "Auxílio Moradia e Residência Universitária", texto: "Vagas em residências universitárias ou auxílio em dinheiro para estudantes que vêm de fora.", img: "", link: "" },
          { titulo: "Auxílio Alimentação", texto: "Subsídio ou refeições nas unidades que têm Restaurante Universitário.", img: "", link: "" },
          { titulo: "Auxílio Creche", texto: "Apoio para estudantes com filhos de até 5 anos e 11 meses.", img: "", link: "" },
          { titulo: "Outros auxílios", texto: "Bolsas de inclusão digital, apoio pedagógico, acessibilidade (NAC) e auxílios emergenciais.", img: "", link: "" }
        ]
      },
      {
        id: "bibliotecas",
        nome: "Sistema de Bibliotecas",
        desc: "SiBi/UFAL e a Biblioteca Central.",
        janelas: [
          { titulo: "Sistema de Bibliotecas (SiBi/UFAL)", texto: "Gerencia o acesso ao conhecimento em todos os campi da universidade. É formado pelo Arquivo Central e por 15 bibliotecas distribuídas por Alagoas.", img: "", link: "" },
          { titulo: "Biblioteca Central (BC)", texto: "A principal biblioteca do sistema, localizada no Campus A. C. Simões, em Maceió.", img: "", link: "" }
        ]
      },
      {
        id: "restaurante",
        nome: "Restaurante Universitário",
        desc: "Almoço e jantar completos dentro dos campi.",
        janelas: [
          { titulo: "Restaurante Universitário (RU)", texto: "Serviço de alimentação da UFAL que garante almoço e jantar completos a preços muito baixos, ou gratuitos, dentro dos campi.", img: "", link: "" },
          { titulo: "O que oferece", texto: "Refeições nutritivas com prato principal (incluindo opção vegetariana), acompanhamentos, salada, suco e sobremesa.", img: "", link: "" },
          { titulo: "Onde funciona", texto: "Nos campi de Maceió, Arapiraca, Rio Largo (Ceca) e Delmiro Gouveia (Sertão).", img: "", link: "" },
          { titulo: "Como pagar e entrar", texto: "O sistema é 100% digital. Você compra créditos online pelo aplicativo ou pelo portal Minha UFAL e entra apresentando um documento com foto e a validação no celular.", img: "", link: "" },
          { titulo: "Alimentação gratuita", texto: "Estudantes em vulnerabilidade socioeconômica podem pedir isenção total do pagamento pelos editais da Proest.", img: "", link: "" }
        ]
      }
    ]
  }
];

/* =====================================================================
   COMPONENTES INTERNOS
   ===================================================================== */
const IcoFoto = () => (
  <svg viewBox="0 0 54 54" aria-hidden="true">
    <rect x="5" y="9" width="44" height="36" rx="6" fill="none" stroke="currentColor" strokeWidth="3"/>
    <circle cx="18" cy="21" r="4.5" fill="currentColor"/>
    <path d="M7 41l14-13 9 8 8-7 9 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
);

const IcoPasta = () => (
  <svg className="ico" viewBox="0 0 44 36" aria-hidden="true">
    <path d="M2 6a4 4 0 0 1 4-4h10l4 5h18a4 4 0 0 1 4 4v19a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" fill="currentColor"/>
  </svg>
);

const IcoSeta = () => (
  <svg className="chev" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 7l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* =====================================================================
   PÁGINA PRINCIPAL
   ===================================================================== */
export default function Oportunidades() {
  
  useEffect(() => {
    // Garante que o scroll vá para o topo ou para o hash correto ao carregar a página
    if (window.location.hash) {
      abrir(window.location.hash.slice(1));
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const abrir = (id: string) => {
    const el = document.getElementById(id) as HTMLDetailsElement;
    if (el && el.tagName === "DETAILS") {
      el.open = true;
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };

  return (
    <div className="page-oportunidades">
      <div className="page-hero">
        <div className="wrap">
          <h1>Oportunidades</h1>
          <p>Laboratórios, projetos, bolsas e serviços do Instituto de Computação e da UFAL para você aproveitar ao máximo a graduação. Abra uma pasta para ver o que ela reúne.</p>
          <nav className="jump" aria-label="Ir para uma pasta">
            {GRUPOS.flatMap(g => g.pastas).map(p => (
              <a key={p.id} href={`#${p.id}`} onClick={(e) => { e.preventDefault(); abrir(p.id); }}>
                {p.nome}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <main className="oport-main">
        {GRUPOS.map((grupo, gIdx) => (
          <section className="group" key={gIdx}>
            <h2>{grupo.nome}</h2>
            <p>{grupo.desc}</p>
            
            {grupo.pastas.map((pasta) => (
              <details className="folder" id={pasta.id} key={pasta.id}>
                <summary>
                  <IcoPasta />
                  <div className="ttl">
                    <b>{pasta.nome}</b>
                    <span>{pasta.desc}</span>
                  </div>
                  <IcoSeta />
                </summary>
                
                <div className="wins">
                  {pasta.janelas.map((win, wIdx) => (
                    <article className="win" key={wIdx}>
                      <div className="win__media">
                        {win.img ? (
                          <img src={win.img} alt={win.titulo} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        ) : (
                          <div className="ph">
                            <IcoFoto />
                            <span>Adicione uma foto</span>
                          </div>
                        )}
                      </div>
                      <div className="win__body">
                        <h3>{win.titulo}</h3>
                        <p>{win.texto}</p>
                        <a 
                          className="btn-more" 
                          href={win.link || "#"} 
                          target={win.link ? "_blank" : undefined} 
                          rel={win.link ? "noopener noreferrer" : undefined}
                          onClick={e => !win.link && e.preventDefault()}
                        >
                          Saiba mais
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </details>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}