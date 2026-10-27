function Tutoriais() {
  return (
    <div className="content-container">
      <h2>Guia e Tutoriais do Aluno</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
        Clique nos tópicos para visualizar o passo a passo de cada procedimento acadêmico.
      </p>

      <details className="main-topic">
        <summary>📂 SIGAA - Sistema Integrado de Gestão de Atividades Acadêmicas</summary>
        <div className="tutorial-body">
          
          <details className="sub-topic">
            <summary>Como trancar uma disciplina ou curso?</summary>
            <p>Para realizar o trancamento, o aluno deve seguir o caminho demonstrado abaixo diretamente no sistema acadêmico:</p>
            <ol>
              <li>Acesse o SIGAA com seu login e senha institucional.</li>
              <li>Navegue até a aba <strong>Ensino &gt; Matrícula On-Line</strong>.</li>
              <li>Selecione a opção <strong>Trancamento de Matrícula em Componente Curricular</strong> (para disciplinas) ou a opção equivalente para o curso.</li>
              <li>Confira os dados, confirme a solicitação e guarde o comprovante.</li>
            </ol>
            <img src="https://portal.ufrrj.br/wp-content/uploads/2019/03/Trancamento-de-Matr%C3%ADcula-1-1.png" alt="Exemplo da tela de trancamento de matrícula" className="tutorial-img" />
          </details>

          <details className="sub-topic">
            <summary>Como emitir o histórico escolar ou declaração de matrícula?</summary>
            <ol>
              <li>No menu inicial do discente, acesse a aba <strong>Ensino</strong>.</li>
              <li>Clique em <strong>Emitir Declaração de Vínculo</strong> ou <strong>Emitir Histórico</strong>.</li>
              <li>O documento em PDF será gerado com código de autenticação digital.</li>
            </ol>
          </details>

        </div>
      </details>

      <details className="main-topic">
        <summary>📂 Carteirinha Estudantil e Acesso ao Campus</summary>
        <div className="tutorial-body">
          <details className="sub-topic">
            <summary>Como solicitar a identidade estudantil física/digital?</summary>
            <p>O calouro deve comparecer ao setor de atendimento acadêmico ou solicitar via requerimento online anexando documento oficial com foto e comprovante de matrícula ativo.</p>
          </details>
        </div>
      </details>
    </div>
  );
}

export default Tutoriais;