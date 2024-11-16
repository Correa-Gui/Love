onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};



document.querySelectorAll('.no-button').forEach(button => {
  button.addEventListener('mouseover', () => {
    // Obtém os valores dos atributos data-x e data-y
    const x = button.getAttribute('data-x');
    const y = button.getAttribute('data-y');

    // Define a posição do botão
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;

    // (Opcional) Atualiza os valores de data-x e data-y para uma nova posição aleatória
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const newX = Math.random() * (viewportWidth - button.offsetWidth);
    const newY = Math.random() * (viewportHeight - button.offsetHeight);

    button.setAttribute('data-x', newX);
    button.setAttribute('data-y', newY);
  });
});




const yesButton = document.querySelector('.yes-button');
const container = document.querySelector('.container');
const inputContainer = document.querySelector('.input-container');
const magicWordInput = document.getElementById('magic-word');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const continueButton = document.getElementById('continue-button');
const errorMessage2 = document.getElementById('error-message2');

// Exibir o input ao clicar no botão "Yes"
yesButton.addEventListener('click', () => {
  container.style.display = 'none'; // Esconde a tela principal
  inputContainer.style.display = 'flex'; // Mostra a nova tela
});

// Validação contínua enquanto o usuário digita
magicWordInput.addEventListener('input', () => {
  validateMagicWord();
});

// Função para validar a palavra mágica
function validateMagicWord() {
  const magicWord = magicWordInput.value.trim().toLowerCase();

  if (magicWord === 'nenequinha') {
    magicWordInput.classList.remove('error', 'erro2');
    magicWordInput.classList.add('success');
    errorMessage.style.display = 'none';
    errorMessage2.style.display = 'none';
    successMessage.style.display = 'block';
    continueButton.style.display = 'block';
  } else if (magicWord === 'neca') {
    magicWordInput.classList.remove('error', 'success');
    magicWordInput.classList.add('erro2');
    errorMessage.style.display = 'none';
    errorMessage2.style.display = 'block';
    successMessage.style.display = 'none';
    continueButton.style.display = 'none';
  } else {
    magicWordInput.classList.add('error');
    magicWordInput.classList.remove('success', 'erro2');
    errorMessage.style.display = 'block';
    errorMessage2.style.display = 'none';
    successMessage.style.display = 'none';
    continueButton.style.display = 'none';
  }
}

// Ação ao clicar no botão "Continuar"
// Ação ao clicar no botão "Continuar"
continueButton.addEventListener('click', () => {
  window.location.href = './intro.html'; // Substitua pelo link desejado
});

