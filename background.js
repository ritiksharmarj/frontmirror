console.log('background running');

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { openModal: 'EXECUTE_MODAL' });
});
