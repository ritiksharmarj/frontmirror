console.log('content script running');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.openModal === 'EXECUTE_MODAL') {
    // To run the functions sequentially
    (async () => {
      await loadModal();
      injectCameraIframe();
      addClickHandler();
    })();
  }
});

async function loadModal() {
  try {
    // Fetch the modal HTML content
    const modalResponse = await fetch(chrome.runtime.getURL('/modal.html'));
    const modalHTML = await modalResponse.text();
    console.log(modalHTML);

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
function addClickHandler() {
  document.addEventListener('click', function (event) {
    // Check if the click event occurred within the camera overlay or its descendants
    const cameraOverlay = document.getElementById('fm-app-overlay');
    if (
      cameraOverlay &&
      (event.target === cameraOverlay || cameraOverlay.contains(event.target))
    ) {
      // Remove the camera overlay
      cameraOverlay.remove();
    }
  });
}
