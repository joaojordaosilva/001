import { useState } from 'react';

import Home from './pages/Home';
import Tutoriais from './pages/Tutoriais';
import Disciplinas from './pages/Disciplinas';
import Calculadora from './pages/Calculadora';

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('inicio');

  const renderizarPagina = () => {
    switch (paginaAtiva) {
      case 'inicio': return <Home />;
      case 'tutoriais': return <Tutoriais />;
      case 'disciplinas': return <Disciplinas />;
      case 'calculadora': return <Calculadora />;
      default: return <Home />;
    }
  };

  return (
    <>
      <header>
        <a href="#" onClick={(e) => { e.preventDefault(); setPaginaAtiva('inicio'); }} className="logo">
          {/* Se o logótipo estiver solto na pasta public, o caminho é apenas /logo.png */}
          <img src="/logo.png" alt="Logo GIC" />
        </a>

        {/* A navegação agora está DENTRO do header, na mesma linha da logo */}
        <nav className="capsule-nav">
          <a href="#" className={paginaAtiva === 'inicio' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setPaginaAtiva('inicio'); }}>Início</a>
          <a href="#" className={paginaAtiva === 'tutoriais' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setPaginaAtiva('tutoriais'); }}>Tutoriais</a>
          <a href="#" className={paginaAtiva === 'disciplinas' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setPaginaAtiva('disciplinas'); }}>Disciplinas</a>
          <a href="#" className={paginaAtiva === 'calculadora' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setPaginaAtiva('calculadora'); }}>Calculadora</a>
        </nav>
      </header>

      {/* Retirámos a tag <main> que limitava a largura, deixando a página livre */}
      <div className="main-content">
        {renderizarPagina()}
      </div>

      <footer className="site-footer">
        <div className="footer-content">
            <div className="footer-section">
                <h4>Equipe de Desenvolvimento</h4>
                <p><strong>João:</strong> Front-end & UI/UX<br/>
                   <strong>Josivaldo:</strong> Back-end & Arquitetura<br/>
                   <strong>Dárcio:</strong> Banco de Dados & Gestão</p>
            </div>
            <div className="footer-section">
                <h4>Suporte e Links Úteis</h4>
                <p>Email: suporte-calouros@ic.br<br/>
                   Coordenação: (00) 0000-0000<br/>
                   <a href="#" style={{color: '#ffc107', textDecoration: 'none'}}>Portal Institucional Oficial</a></p>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2026 Instituto de Computação - Portal do Calouro</p>
        </div>
      </footer>

      <a href="#" className="floating-btn">💬 Chatbot</a>
    </>
  );
}

export default App;