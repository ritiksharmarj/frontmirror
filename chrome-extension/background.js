// When click on extension icon
chrome.action.onClicked.addListener((tab) => {
  // Open the app by sending a message to the content script
  chrome.tabs.sendMessage(tab.id, { openApp: true });
});

// Use keyboard shortcut to open extension
chrome.commands.onCommand.addListener((command, tab) => {
  chrome.tabs.sendMessage(tab.id, { openApp: true });
});

// Open URL in new tab when extension is installed
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: 'https://www.producthunt.com/posts/front-mirror-one-click-camera-check',
    });
  }
});

// Open survey URL in new tab when extension is uninstalled
chrome.runtime.setUninstallURL('https://ritiksharma.me/feedback');
