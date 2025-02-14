import { mount, unmount } from './content-app';

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'TOGGLE_CAMERA') {
    const appExists = document.getElementById('frontmirror-root');
    appExists ? unmount() : mount();
  }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('frontmirror-root')) {
    unmount();
  }
});
