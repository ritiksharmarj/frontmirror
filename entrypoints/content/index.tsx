import './style.css';
import ReactDOM from 'react-dom/client';
import CameraOverlay from '../camera/overlay';

export default defineContentScript({
  // Set manifest options
  matches: ['<all_urls>'],

  // Executed when content script is loaded, can be async
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        container.id = 'frontmirror-app';

        const root = ReactDOM.createRoot(container);
        root.render(<CameraOverlay />);
        return root;
      },
      onRemove: (root) => {
        // Unmount the root when the UI is removed
        root?.unmount();
      },
    });

    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'OPEN_CAMERA') {
        ui.mount();
      }
    });
  },
});
