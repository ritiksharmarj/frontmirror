import * as React from 'react';

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
    const root = document.getElementById('frontmirror-app');
    if (root) root.remove();
  };

  return (
    <div id='frontmirror-app__overlay' onClick={handleOverlayClick}>
      <iframe
        id='frontmirror-app__camera'
        src={chrome.runtime.getURL('camera.html')}
        allow='camera'
      />
    </div>
  );
}
