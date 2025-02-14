chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;
  chrome.tabs.sendMessage(tab.id, { action: 'TOGGLE_CAMERA' });
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'inject-script' && tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: 'TOGGLE_CAMERA' });
  }
});
