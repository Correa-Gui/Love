// Simulação de um banco de dados de questionários
const questionarios = {
    924: {
      titulo: "Exercícios de Fixação",
      perguntas: [
        {
          id: 1,
          descricao_da_pergunta: "Os pontos mortos são:",
          respostas: [
            { id: 1, descricao_da_resposta: "Posições extremas do pistão em seu movimento", resposta_correta: true },
            { id: 2, descricao_da_resposta: "Pontos onde o pistão não fornece potência", resposta_correta: false },
            { id: 3, descricao_da_resposta: "Os pontos mais baixos atingidos pelo pistão", resposta_correta: false },
            { id: 4, descricao_da_resposta: "Os pontos em que as válvulas estão fechadas", resposta_correta: false },
          ],
        },
        {
          id: 2,
          descricao_da_pergunta: "Quando o pistão se desloca de um ponto morto ao outro, o eixo de manivelas efetua uma rotação de:",
          respostas: [
            { id: 5, descricao_da_resposta: "Uma volta", resposta_correta: false },
            { id: 6, descricao_da_resposta: "Duas voltas", resposta_correta: false },
            { id: 7, descricao_da_resposta: "Meia volta", resposta_correta: true },
            { id: 8, descricao_da_resposta: "Quatro voltas", resposta_correta: false },
          ],
        },
      ],
    },
  };
  

// Configuração das perguntas
let currentQuestionIndex = 0;
let totalQuestions = 0;
let respostasUsuario = []; // Salva as respostas do usuário como { perguntaId, respostaId }

// Inicializa o questionário no modal
function openQuestionnaire(questionnaireId) {
  const questionnaire = questionarios[questionnaireId];
  if (!questionnaire) return;

  const { perguntas } = questionnaire;
  totalQuestions = perguntas.length;
  currentQuestionIndex = 0;

  // Inicializa respostas do usuário
  respostasUsuario = perguntas.map(() => null);

  // Renderiza perguntas retraídas e ativa
  renderActiveQuestion(perguntas[currentQuestionIndex]);
  renderCollapsedQuestions(perguntas);

  // Mostra o modal
  const modal = new bootstrap.Modal(document.getElementById('questionnaireModal'));
  modal.show();
}

// Renderiza a pergunta ativa
function renderActiveQuestion(pergunta) {
  const activeQuestionContainer = document.getElementById('active-question');

  const alternativas = pergunta.respostas.map((resposta, index) => {
    const letra = String.fromCharCode(65 + index); // Converte índice para A, B, C...
    const isChecked = respostasUsuario[currentQuestionIndex] === resposta.id ? "checked" : ""; // Verifica se a alternativa foi selecionada
    return `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="answer-${pergunta.id}" id="answer-${resposta.id}" value="${resposta.id}" ${isChecked}>
        <label class="form-check-label" for="answer-${resposta.id}">
          ${letra}) ${resposta.descricao_da_resposta}
        </label>
      </div>
    `;
  }).join('');

  activeQuestionContainer.innerHTML = `
    <h5>Pergunta ${currentQuestionIndex + 1} de ${totalQuestions}: ${pergunta.descricao_da_pergunta}</h5>
    ${alternativas}
  `;

  updateFooterButtons();
}

// Renderiza a lista de perguntas retraídas
function renderCollapsedQuestions(perguntas) {
  const collapsedQuestionsContainer = document.getElementById('collapsed-questions');
  collapsedQuestionsContainer.innerHTML = perguntas.map((pergunta, index) => {
    const respostaId = respostasUsuario[index];
    const respostaSelecionada = pergunta.respostas.find(resposta => resposta.id === respostaId);
    const respostaTexto = respostaSelecionada ? `(${String.fromCharCode(65 + pergunta.respostas.indexOf(respostaSelecionada))}) ${respostaSelecionada.descricao_da_resposta}` : "";
    const answeredClass = respostaSelecionada ? "answered" : ""; // Adiciona classe "answered" para perguntas respondidas



    return `
      <li class="list-group-item ${index === currentQuestionIndex ? 'active' : ''} ${answeredClass}" onclick="goToQuestion(${index})">
        Pergunta ${index + 1} - ${pergunta.descricao_da_pergunta} ${respostaTexto}
      </li>
    `;
  }).join('');
}

// Navega para uma pergunta específica
function goToQuestion(index) {
  saveUserAnswer();
  currentQuestionIndex = index;
  renderActiveQuestion(questionarios[924].perguntas[currentQuestionIndex]);
  renderCollapsedQuestions(questionarios[924].perguntas);
}

// Atualiza os botões do rodapé
function updateFooterButtons() {
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const finishButton = document.getElementById('finish-button');

  prevButton.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
  nextButton.style.display = currentQuestionIndex < totalQuestions - 1 ? 'inline-block' : 'none';
  finishButton.style.display = currentQuestionIndex === totalQuestions - 1 ? 'inline-block' : 'none';
}

// Avança para a próxima pergunta
function nextQuestion() {
  saveUserAnswer();
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    renderActiveQuestion(questionarios[924].perguntas[currentQuestionIndex]);
    renderCollapsedQuestions(questionarios[924].perguntas);
  }
}

// Retorna para a pergunta anterior
function prevQuestion() {
  saveUserAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderActiveQuestion(questionarios[924].perguntas[currentQuestionIndex]);
    renderCollapsedQuestions(questionarios[924].perguntas);
  }
}

// Salva a resposta do usuário para a pergunta atual
function saveUserAnswer() {
  const perguntaAtual = questionarios[924].perguntas[currentQuestionIndex];
  const respostaSelecionada = document.querySelector(`input[name="answer-${perguntaAtual.id}"]:checked`);
  if (respostaSelecionada) {
    respostasUsuario[currentQuestionIndex] = parseInt(respostaSelecionada.value);
  }
}




// Exibe o resultado final
function showResults() {
  console.log("Respostas do usuário:", respostasUsuario);
  alert("Resultados enviados!");
}
