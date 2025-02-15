console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

window.addEventListener('load', () => {
  document.body.style.background = 'pink';
});
