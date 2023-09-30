console.log('background running');

// chrome.action.onClicked.addListener((tab) => {
//   chrome.tabs.sendMessage(tab.id, { openModal: 'EXECUTE_MODAL' });
// });

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
