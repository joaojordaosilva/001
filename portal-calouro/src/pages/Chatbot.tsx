import { useState, useRef, useEffect } from 'react';

interface Mensagem {
  id: string;
  texto: string;
  remetente: 'bot' | 'user';
}

const SUGESTOES = [
  "Como acesso o SIGAA?",
  "Onde faço a carteira VAMU?",
  "Regras de faltas",
  "O que é o PIBIC?"
];

export default function Chatbot({ setPaginaAtiva }: { setPaginaAtiva: (pagina: string) => void }) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { id: '1', texto: 'Olá, calouro! Sou o assistente virtual do GIC. Como posso te ajudar hoje?', remetente: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [escrevendo, setEscrevendo] = useState(false);
  const mensagensEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    mensagensEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, escrevendo]);

  const gerarRespostaBot = (pergunta: string) => {
    const q = pergunta.toLowerCase();
    let resposta = "Ainda estou aprendendo sobre isso! Recomendo dar uma olhada na aba 'Guia do Calouro' ou 'Oportunidades' para encontrar mais detalhes.";
    
    if (q.includes('sigaa') || q.includes('atestado') || q.includes('historico')) {
      resposta = "O SIGAA é o sistema principal da universidade. Lá você emite seu Atestado de Matrícula e acompanha suas notas e faltas. O acesso é feito com seu CPF e senha cadastrada.";
    } else if (q.includes('vamu') || q.includes('onibus') || q.includes('passe livre')) {
      resposta = "Para tirar a carteira VAMU pela primeira vez, você precisa agendar no site oficial do VAMU Maceió. Leve RG, CPF, comprovante de residência atualizado, foto 3x4 e seu Atestado de Matrícula do SIGAA.";
    } else if (q.includes('falta') || q.includes('presença') || q.includes('reprovar')) {
      resposta = "Cuidado com as faltas! A presença mínima exigida é de 75%. Em uma matéria de 60h, você só pode faltar 15h (cerca de 7 faltas). Se estourar o limite, você é reprovado por falta (RF) e perde o direito à Reavaliação.";
    } else if (q.includes('pibic') || q.includes('bolsa') || q.includes('pesquisa')) {
      resposta = "O PIBIC é o Programa de Iniciação Científica. É uma ótima oportunidade para trabalhar junto com professores em pesquisas e ainda ganhar uma bolsa do CNPq ou FAPEAL. Fique de olho nos editais na aba de 'Oportunidades'!";
    }

    return resposta;
  };

  const enviarMensagem = (texto: string) => {
    if (!texto.trim()) return;

    const novaMensagem: Mensagem = { id: Date.now().toString(), texto, remetente: 'user' };
    setMensagens(prev => [...prev, novaMensagem]);
    setInput('');
    setEscrevendo(true);

    setTimeout(() => {
      const respostaBot: Mensagem = {
        id: (Date.now() + 1).toString(),
        texto: gerarRespostaBot(texto),
        remetente: 'bot'
      };
      setMensagens(prev => [...prev, respostaBot]);
      setEscrevendo(false);
    }, 1500);
  };

  return (
    <div className="page-chatbot">
      <div className="page-hero">
        <div className="wrap">
          <div className="hero-top-actions">
            <button className="btn-voltar" onClick={() => setPaginaAtiva('inicio')}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Voltar
            </button>
          </div>
          {/* Textos grandes removidos daqui! */}
        </div>
      </div>

      <main className="chat-main">
        <div className="chat-container">

          {/* O cabeçalho do robô voltou para o lugar certo! */}
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>
            <div className="chat-title">
              <h3>Assistente GIC</h3>
              <span>Online agora</span>
            </div>
          </div>

          <div className="chat-messages">
            {mensagens.map(msg => (
              <div key={msg.id} className={`message-row ${msg.remetente}`}>
                <div className="message-bubble">
                  {msg.texto}
                </div>
              </div>
            ))}
            
            {escrevendo && (
              <div className="message-row bot">
                <div className="message-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={mensagensEndRef} />
          </div>

          <div className="chat-suggestions">
            {SUGESTOES.map((sug, i) => (
              <button key={i} onClick={() => enviarMensagem(sug)} disabled={escrevendo}>
                {sug}
              </button>
            ))}
          </div>

          <form 
            className="chat-input-area" 
            onSubmit={(e) => { e.preventDefault(); enviarMensagem(input); }}
          >
            <input 
              type="text" 
              placeholder="Digite sua dúvida aqui..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              disabled={escrevendo}
            />
            <button type="submit" disabled={!input.trim() || escrevendo} aria-label="Enviar">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>

        </div>
      </main>
    </div>
  );
}