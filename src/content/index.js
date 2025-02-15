console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// change body background color
window.addEventListener('load', () => {
  document.body.style.background = 'pink';
});
