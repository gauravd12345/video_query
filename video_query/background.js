chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === 'get-tab-info') {
    chrome.tabs.get(sender.tab.id, function(tab) {
      sendResponse({ id: tab.id, url: tab.url });
    });
    return true; 
  }
});
