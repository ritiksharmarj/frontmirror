import * as React from 'react';
import CameraInterface from './camera-interface.jsx';

export default function CameraOverlay() {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') unmountCamera();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) unmountCamera();
  };

  const unmountCamera = () => {
    const root = document.getElementById('camera-root');
    if (root) root.remove();
  };

  return (
    <div
      id='fm-app-overlay'
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(3px)',
        zIndex: 2147483647,
      }}
    >
      <CameraInterface />
    </div>
  );
}
