import ReactDOM from 'react-dom/client';
import CameraOverlay from '../components/camera-overlay.jsx';

let cameraRoot = null;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'TOGGLE_CAMERA') {
    if (!document.getElementById('camera-root')) {
      cameraRoot = document.createElement('div');
      cameraRoot.id = 'camera-root';
      document.body.appendChild(cameraRoot);
      ReactDOM.createRoot(cameraRoot).render(<CameraOverlay />);
    } else {
      cameraRoot.remove();
    }
  }
});
