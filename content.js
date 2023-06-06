// content.js

// Função para enviar uma mensagem para o background script
function sendMessageToBackground(action, data) {
    chrome.runtime.sendMessage({ action: action, ...data });
  }
  
  // Função para verificar se a URL corresponde ao padrão de documentação
  function isDocumentationSite(url) {
    const documentationKeywords = ['developer', 'fac', 'docs', 'doc'];
    const regexPattern = new RegExp(documentationKeywords.join('|'), 'i');
  
    return regexPattern.test(url);
  }
  
  // Verifica se a página atual corresponde a um site de documentação e solicita para salvar
  if (isDocumentationSite(window.location.href)) {
    const confirmSave = confirm('Deseja salvar este site para estudo continuado?');
  
    if (confirmSave) {
      sendMessageToBackground('saveSite', { url: window.location.href });
    }
  }
  
  // Listener para atualizar a última página ao navegar
  window.addEventListener('beforeunload', function () {
    sendMessageToBackground('updateLastPage', {
      url: window.location.href,
      lastPage: window.location.href,
    });
  });
  