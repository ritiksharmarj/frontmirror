import ReactDOM from 'react-dom/client';
import CameraOverlay from '../camera/camera-overlay.jsx';

import '../index.css';

let frontmirrorApp = null;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'TOGGLE_CAMERA') {
    if (!document.getElementById('frontmirror-app')) {
      frontmirrorApp = document.createElement('div');
      frontmirrorApp.id = 'frontmirror-app';
      document.body.appendChild(frontmirrorApp);
      ReactDOM.createRoot(frontmirrorApp).render(<CameraOverlay />);
    } else {
      frontmirrorApp.remove();
    }
  }
});
