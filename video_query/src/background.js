chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "get-tab-url") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ url: tabs[0]?.url }); 
    });
    return true;
  }
});
