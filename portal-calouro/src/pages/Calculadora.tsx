import { useState } from 'react';
function Calculadora() {
  const [ab1, setAb1] = useState('');
  const [ab2, setAb2] = useState('');
  const [reav, setReav] = useState('');
  const [resultado, setResultado] = useState<{ situacao: string; mensagem: string } | null>(null);

  const calcularMedia = () => {
    let nota1 = parseFloat(ab1) || 0;
    let nota2 = parseFloat(ab2) || 0;
    const notaReav = parseFloat(reav);

    if (!isNaN(notaReav)) {
      if (nota1 < nota2 && notaReav > nota1) {
        nota1 = notaReav;
      } else if (notaReav > nota2) {
        nota2 = notaReav;
      }
    }

    const media = (nota1 + nota2) / 2;

    if (media >= 7) {
      setResultado({ situacao: "Aprovado por Média! 🎉", mensagem: `A sua média foi ${media.toFixed(1)}.` });
    } else if (media < 5) {
      setResultado({ situacao: "Reprovado 😔", mensagem: `A sua média foi ${media.toFixed(1)}. Tente novamente no próximo semestre.` });
    } else {
      const notaFinalNecessaria = (50 - (media * 6)) / 4; 
      setResultado({ 
        situacao: "Em Prova Final 📚", 
        mensagem: `Média: ${media.toFixed(1)}. Precisa de tirar no mínimo ${Math.max(notaFinalNecessaria, 0).toFixed(1)} na prova final para ser aprovado.` 
      });
    }
  };

  return (
    <div className="content-container">
      <div className="card">
        <h3>Simule as suas Notas</h3>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
          Preencha as suas notas da AB1 e AB2 para saber a sua situação final.
        </p>
        
        <div className="form-group">
          <label>Nota AB1</label>
          <input type="number" value={ab1} onChange={(e) => setAb1(e.target.value)} placeholder="Ex: 6.5" />
        </div>
        
        <div className="form-group">
          <label>Nota AB2</label>
          <input type="number" value={ab2} onChange={(e) => setAb2(e.target.value)} placeholder="Ex: 5.0" />
        </div>

        <div className="form-group">
          <label>Nota de Reavaliação (Opcional)</label>
          <input type="number" value={reav} onChange={(e) => setReav(e.target.value)} placeholder="Ex: 7.0" />
        </div>
        
        <button className="calc-action-btn" onClick={calcularMedia} type="button">Calcular Média</button>

        {resultado && (
          <div className="result-box">
            <p>Situação: {resultado.situacao}</p>
            <p style={{ color: '#333', fontWeight: 'normal', marginTop: '5px' }}>{resultado.mensagem}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculadora;