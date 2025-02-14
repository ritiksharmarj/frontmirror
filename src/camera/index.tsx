import { createRoot } from 'react-dom/client';
import CameraApp from './camera-app';

const root = document.createElement('div');
document.body.appendChild(root);
createRoot(root).render(<CameraApp />);
