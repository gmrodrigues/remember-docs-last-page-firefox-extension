// background.js

// Armazena os sites salvos
let savedSites = [];

// Função para salvar um site
function saveSite(url) {
  // Verifica se o site já está salvo
  const siteIndex = savedSites.findIndex(site => site.url === url);

  if (siteIndex === -1) {
    // Se o site não estiver salvo, adiciona-o à lista
    savedSites.push({
      url: url,
      lastPage: url, // Define a última página como a URL inicial
    });
  } else {
    // Se o site já estiver salvo, atualiza a URL
    savedSites[siteIndex].url = url;
  }
}

// Função para atualizar a última página de um site
function updateLastPage(url, lastPage) {
  const siteIndex = savedSites.findIndex(site => site.url === url);

  if (siteIndex !== -1) {
    savedSites[siteIndex].lastPage = lastPage;
  }
}

// Função para recuperar os sites salvos
function getSavedSites() {
  return savedSites;
}

// Listener para receber mensagens da extensão
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'saveSite') {
    saveSite(request.url);
  } else if (request.action === 'updateLastPage') {
    updateLastPage(request.url, request.lastPage);
  } else if (request.action === 'getSavedSites') {
    sendResponse(getSavedSites());
  }
});
