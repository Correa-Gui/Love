const moduleData = {
    Apresentacao_do_curso: [
      {
        module: "Apresentação do Curso",
        videos: [
          { title: "Visão Geral", url: "https://player.vimeo.com/video/666843831" },
          { title: "Material Didático", url: "https://cursoapi.ejead.com.br/storage/arquivos/jOcE3uzgD3LMfPJfO2iAgU3BT5Nm74L7d9vhhOiV.pdf" }
        ]
      }
    ],
    conhecimentos_tecnicos: [
      {
        module: "Módulo 1",
        videos: [
          { title: "Unidade 1 - Apresentação da disciplina / Aeronaves", url: "https://player.vimeo.com/video/544643658" },
          { title: "Unidade 2 - A Estrutura do Avião", url: "https://player.vimeo.com/video/545122577" },
          { title: "Unidade 3 - Superfícies de Comando", url: "https://player.vimeo.com/video/544845250" }
        ],
        questionnaire: { id: 924, title: "Exercício de Fixação" }
      },
      {
        module: "Módulo 2",
        videos: [
          { title: "Unidade 1: Superfícies de Comando", url: "https://player.vimeo.com/video/123456789" },
          { title: "Unidade 2: Dinâmica do Voo", url: "https://player.vimeo.com/video/987654321" }
        ],
        questionnaire: { id: 2, title: "Exercício de Fixação" }
      }
    ]
  };
  // Determina a página atual
const currentPage = window.location.pathname.split('/').pop().replace('.html', '');

// Carrega conteúdo da página
document.addEventListener("DOMContentLoaded", () => {
  if (currentPage === "apresentacao_do_curso") {
    loadSingleModule("apresentacao_do_curso");
  } else {
    loadModuleTabs(currentPage);
  }
});

// Função para carregar conteúdo de páginas com módulos únicos
function loadSingleModule(moduleKey) {
  const moduleContent = document.getElementById("module-content");
  const module = moduleData[moduleKey][0]; // Obtém o primeiro item do array

  if (!module) {
    moduleContent.innerHTML = "<p class='text-center'>Nenhum conteúdo encontrado para esta página.</p>";
    return;
  }

  moduleContent.innerHTML = `
    <h1 class="text-center">${module.module}</h1>
    <ul class="list-group mb-3">
      ${module.videos
        .map(
          (video) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${video.title}
          <a href="${video.url}" target="_blank" class="btn btn-primary btn-sm">Assistir</a>
        </li>
      `
        )
        .join("")}
    </ul>
  `;
}

// Função para carregar abas e conteúdos para páginas com múltiplos módulos
function loadModuleTabs(moduleKey) {
  const moduleTabs = document.getElementById("module-tabs");
  const moduleContent = document.getElementById("module-content");
  const modules = moduleData[moduleKey];

  if (!modules) {
    moduleContent.innerHTML = "<p class='text-center'>Nenhum módulo encontrado para esta página.</p>";
    return;
  }

  modules.forEach((module, index) => {
    // Criar aba
    const tab = document.createElement("li");
    tab.className = "nav-item";
    tab.innerHTML = `
      <button class="nav-link ${index === 0 ? "active" : ""}" id="tab-${index}" data-bs-toggle="tab" data-bs-target="#content-${index}" type="button" role="tab">
        ${module.module}
      </button>`;
    moduleTabs.appendChild(tab);

    // Conteúdo da aba
    const content = document.createElement("div");
    content.className = `tab-pane fade ${index === 0 ? "show active" : ""}`;
    content.id = `content-${index}`;
    content.innerHTML = `
      <ul class="list-group mb-3">
        ${module.videos
          .map(
            (video) => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${video.title}
            <button class="btn btn-primary btn-sm" onclick="loadVideo('${video.url}')">Assistir</button>
          </li>
        `
          )
          .join("")}
        ${module.questionnaire ? `
        <button class="btn questionnaire-btn" data-bs-toggle="modal" data-bs-target="#questionnaireModal" onclick="openQuestionnaire(${module.questionnaire.id})">
          ${module.questionnaire.title}
        </button>` : ""}
    `;
    moduleContent.appendChild(content);
  });
}

  

// Função para carregar vídeo no iframe
function loadVideo(url) {
  const iframe = document.getElementById("video-frame");
  iframe.src = url;
  iframe.style.display = "block";
}
