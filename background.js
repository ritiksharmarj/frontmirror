console.log('background running');

let appOpen = false;

chrome.action.onClicked.addListener((tab) => {
  if (appOpen) {
    // Close the app by sending a message to the content script
    chrome.tabs.sendMessage(tab.id, { reloadApp: true });
    // appOpen = false;
  } else {
    // Open the app by sending a message to the content script
    chrome.tabs.sendMessage(tab.id, { openApp: true });
    appOpen = true;
  }
});
