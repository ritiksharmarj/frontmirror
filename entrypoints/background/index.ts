export default defineBackground({
  // Executed when background is loaded, CANNOT BE ASYNC
  main() {
    chrome.action.onClicked.addListener(async (tab) => {
      if (!tab.id) return;

      await chrome.tabs.sendMessage(tab.id, { action: 'OPEN_CAMERA' });
    });

    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'OPEN_SETTINGS') {
        chrome.tabs.create({ url: 'chrome://settings/content/camera' });
      }

      if (message.action === 'RELOAD_TAB') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
        });
      }
    });
  },
});
