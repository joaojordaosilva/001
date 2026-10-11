function Disciplinas() {
  return (
    <div className="content-container">
      <h2>Mapeamento de Disciplinas</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
        Clique na disciplina para visualizar o seu roteiro de estudos e pré-requisitos.
      </p>

      <details className="main-topic">
        <summary>📘 PROJETO E ANÁLISE DE ALGORITMOS</summary>
        <div className="tutorial-body">
          <p>Abaixo encontra-se o mapeamento estrutural e o roteiro para a disciplina de Projeto e Análise de Algoritmos:</p>
          <img src="img/roadmap.png" alt="Roadmap PAA" className="tutorial-img" />
        </div>
      </details>
    </div>
  );
}

export default Disciplinas;