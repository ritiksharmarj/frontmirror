// Receive message from background service worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.openApp) {
    // Delete if already exist
    const frontmirrorApp = document.getElementById('frontmirror-app');
    if (frontmirrorApp) {
      frontmirrorApp.remove();
    }

    // Open the app
    (async () => {
      await loadModal();
      injectCameraIframe();
    })();
  }
});

// Load frontmirror modal to the DOM
async function loadModal() {
  try {
    // Fetch the modal HTML content
    const modalResponse = await fetch(chrome.runtime.getURL('/modal.html'));
    const modalHTML = await modalResponse.text();

    // Create a container element for the modal
    const modalContainer = document.createElement('div');
    modalContainer.id = 'frontmirror-app';
    modalContainer.innerHTML = modalHTML;

    // Append the modal container to the body
    document.body.appendChild(modalContainer);
  } catch (error) {
    console.error(`Modal Error: ${error}`);
  }
}

// Inject camera iframe to the app overlay
function injectCameraIframe() {
  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('/camera/camera.html');
  iframe.setAttribute('id', 'fm-camera');
  iframe.setAttribute('allow', 'camera');

  const cameraOverlay = document.getElementById('fm-app-overlay');
  cameraOverlay.appendChild(iframe);
}

/**
 * Remove overlay element from the DOM
 * Add a click event listener to the document
 */
document.addEventListener('click', function (e) {
  // Check if the click event occurred within the camera overlay or its descendants
  const cameraOverlay = document.getElementById('fm-app-overlay');
  if (
    cameraOverlay &&
    (e.target === cameraOverlay || cameraOverlay.contains(e.target))
  ) {
    // Remove the camera overlay
    cameraOverlay.remove();
  }
});

// Remove camera overlay element when press "Escape" key
document.addEventListener('keydown', function (e) {
  const cameraOverlay = document.getElementById('fm-app-overlay');

  if (e.key === 'Escape' && cameraOverlay) {
    cameraOverlay.remove();
  }
});
