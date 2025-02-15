// When click on extension icon
chrome.action.onClicked.addListener((tab) => {
  // Open the app by sending a message to the content script
  chrome.tabs.sendMessage(tab.id, { action: 'TOGGLE_CAMERA' });
});

// Use keyboard shortcut to open extension
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'inject-script' && tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: 'TOGGLE_CAMERA' });
  }
});
