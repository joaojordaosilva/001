// Ficheiro: api/base_conhecimento.mjs

export const baseDeConhecimento = `
# BASE DE CONHECIMENTO INSTITUCIONAL - UFAL / SIGAA

## 1. Acesso ao SIGAA e Turma Virtual
- Acesso: O login no SIGAA é feito com o mesmo utilizador e palavra-passe do antigo sistema SIEWEB.
- Portal do Discente: É o ambiente principal onde o aluno acede ao menu "Ensino" e gere a sua vida académica.
- Turma Virtual: Exibe os Componentes Curriculares (disciplinas), horários e locais de aula. O professor pode optar por usar o SIGAA ou o Moodle como Ambiente Virtual de Aprendizagem (AVA).
- Notas e Frequência: Disponíveis pelo caminho Ensino > Consultar Minhas Notas. Exibe a situação de aprovação/reprovação e o número de faltas.

## 2. Emissão de Documentos Académicos
- Atestado de Matrícula: Ensino > Emitir Atestado de Matrícula. Comprova as turmas e horários nos quais o discente está matriculado no semestre letivo.
- Comprovante de Matrícula: Ensino > Matrícula On-Line > Ver Comprovante de Matrícula.
- Declaração de Vínculo: Ensino > Emitir Declaração de Vínculo.
- Histórico Escolar: Ensino > Emitir Histórico. Exibe as pendências curriculares (disciplinas que faltam para concluir o curso).
- Índice de Rendimento Académico (IRA): É a média ponderada do rendimento escolar final obtido em todos os componentes concluídos ao longo do curso.

## 3. Status do Discente no Sistema
- Ativo: Aluno com matrícula ativa.
- Trancado: Aluno com trancamento de matrícula (suspensão de programa).
- Formando: Aluno próximo da conclusão do curso (antigo "provável concluinte").
- Formado: Aluno que concluiu todos os componentes do curso (antigo "integralizado"). Apenas discentes com este status podem solicitar colação de grau.
- Concluído: Aluno que já colou grau.
- Cancelado: Aluno com matrícula cancelada permanentemente.

## 4. Regras de Matrícula
- Responsabilidade: A matrícula é da responsabilidade do estudante e deve ser feita no período do Calendário Académico. Exceção: A matrícula dos ingressantes (caloiros) é feita automaticamente pela Coordenação do Curso.
- Abandono: O aluno que não realizar a matrícula por dois períodos regulares consecutivos (sem estar em mobilidade ou com suspensão) terá o vínculo cancelado por abandono de curso.
- Como fazer: Ensino > Matrícula On-line > Realizar Matrícula. É necessário declarar ciência das regras para iniciar a seleção de turmas e confirmar com a palavra-passe no final.

## 5. Suspensão de Programa (Trancamento Geral do Curso)
- Definição: Interrupção total das atividades académicas, garantindo o vínculo com a instituição.
- Regras e Limites: Limite máximo de 4 períodos letivos (consecutivos ou não). O tempo suspenso não conta para o prazo máximo de integralização do curso. Acarreta o cancelamento de todas as disciplinas em curso no semestre.
- Restrições: Proibido no primeiro período letivo (ingresso), salvo exceções. O aluno não pode ter pendências nas bibliotecas da UFAL. Cursos EAD não permitem suspensão padrão devido à oferta não contínua.
- Caminho: Ensino > Suspensão de Programa > Iniciar Solicitação de Suspensão Regular.

## 6. Trancamento de Componente Curricular (Trancamento de Disciplina)
- Definição: Desvinculação voluntária de uma turma específica.
- Regras e Prazos: O trancamento deve respeitar a carga horária mínima do período. Deve ser solicitado até ao cumprimento de 1/3 da carga horária prevista de aulas.
- Restrições: Não é permitido trancar disciplinas sem aulas, orientação individual, atividades autónomas, ou subunidades isoladas de um módulo. É proibido no primeiro período do curso. O trancamento de uma disciplina tranca automaticamente os seus co-requisitos.
- Efetivação: A disciplina só é trancada 7 dias corridos após a solicitação (período no qual é possível cancelar o pedido).
- Caminho: Ensino > Trancamento de Matrícula > Trancar.

## 7. Atividades Autónomas (Carga Horária Flexível)
- Como registar: Ensino > Registro de Atividades Autónomas.
- Procedimento: O aluno deve preencher os detalhes da atividade (tipo e descrição) e anexar o documento comprovativo em PDF (certificados, bilhetes, declarações). O campo de carga horária preenche automaticamente o teto máximo permitido, que será ajustado pela coordenação durante a avaliação.

## 8. Aproveitamento e Incorporação de Estudos
- Definição: Validação de estudos de nível superior feitos antes do ingresso na UFAL.
- Critérios: Exige-se 75% de equivalência (conteúdo e carga horária). As disciplinas devem ter sido cursadas há, no máximo, 10 anos (disciplinas mais antigas exigem aprovação em prova de suficiência com nota mínima 7). Disciplinas isoladas externas não são aceites (salvo em mobilidade oficial).
- Caminho: Ensino > Solicitar Aproveitamento/Incorporação de Estudos.
  - Automático: Para equivalências já registadas na estrutura curricular.
  - Manual: Para cursos noutras instituições. Exige anexo (PDF) do histórico externo e ementa/programa da disciplina.
  - Incorporação: Exclusivo para disciplinas cursadas durante mobilidade académica oficial.

## 9. Solicitação de Colação de Grau
- Requisito: Apenas alunos com o status "Formado" podem solicitar.
- Caminho: Ensino > Solicitar Validação de Documentos para Registro de Diploma.
- Documentos Exigidos (PDF): Documento de identidade (RG legível), declaração de quitação com a Biblioteca Central, recibo de depósito do TCC no Repositório Institucional da UFAL, documento militar atualizado (para homens de cursos específicos da área de saúde), e declaração de quitação com a coordenação (para Educação Física e Odontologia).
`;