async function injectContentScript(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.bundle.js"],
    });
    return true;
  } catch (error) {
    console.error("Injection failed:", error);
    return false;
  }
}

async function handleCameraToggle(tab) {
  if (!tab?.id) return;

  try {
    // Check if content script is already injected
    const injectionResult = await injectContentScript(tab.id);
    if (!injectionResult) return;

    // Send message after successful injection
    await chrome.tabs.sendMessage(tab.id, { action: "TOGGLE_CAMERA" });
  } catch (error) {
    console.error("Communication error:", error);
  }
}

// Handle extension icon click
chrome.action.onClicked.addListener(handleCameraToggle);

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "inject-script") {
    handleCameraToggle(tab);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "OPEN_SETTINGS") {
    chrome.tabs.create({ url: "chrome://settings/content/camera" });
  }
  if (message.action === "RELOAD_TAB") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
    });
  }
});
