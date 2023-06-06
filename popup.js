// popup.js

// Função para exibir os sites salvos na lista
function displaySavedSites(sites) {
    const savedSitesList = document.getElementById('savedSitesList');
  
    // Limpa a lista antes de atualizá-la
    savedSitesList.innerHTML = '';
  
    sites.forEach(site => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
  
      link.href = site.lastPage;
      link.textContent = site.url;
  
      listItem.appendChild(link);
      savedSitesList.appendChild(listItem);
    });
  }
  
  // Envia uma mensagem para o background script para obter os sites salvos
  chrome.runtime.sendMessage({ action: 'getSavedSites' }, function(response) {
    displaySavedSites(response);
  });
  