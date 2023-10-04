chrome.action.onClicked.addListener((tab) => {
  // Open the app by sending a message to the content script
  chrome.tabs.sendMessage(tab.id, { openApp: true });
});

chrome.commands.onCommand.addListener((command, tab) => {
  chrome.tabs.sendMessage(tab.id, { openApp: true });
});
