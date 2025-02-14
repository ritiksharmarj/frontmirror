import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const overlay = document.getElementById('fm-app-overlay');
      if (overlay?.contains(e.target as Node)) {
        overlay.remove();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div id='frontmirror-extension'>
      <div id='fm-app-overlay'>
        <iframe
          src={chrome.runtime.getURL('camera.html')}
          id='fm-camera'
          allow='camera'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            maxWidth: '700px',
            minHeight: '600px',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 24px 40px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </div>
  );
};

export const mount = () => {
  const root = document.createElement('div');
  root.id = 'frontmirror-root';
  document.body.appendChild(root);
  createRoot(root).render(<App />);
};

export const unmount = () => {
  const root = document.getElementById('frontmirror-root');
  root?.remove();
};
