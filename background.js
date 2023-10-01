// let appOpen = false;

// chrome.action.onClicked.addListener((tab) => {
//   if (appOpen) {
//     // Reload the app by sending a message to the content script
//     chrome.tabs.sendMessage(tab.id, { reloadApp: true });
//   } else {
//     // Open the app by sending a message to the content script
//     chrome.tabs.sendMessage(tab.id, { openApp: true });
//     appOpen = true;
//   }
// });

chrome.action.onClicked.addListener((tab) => {
  // Open the app by sending a message to the content script
  chrome.tabs.sendMessage(tab.id, { openApp: true });
});
