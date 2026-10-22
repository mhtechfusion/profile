const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));
const dialog = document.querySelector('#image-dialog');
let lastTrigger;
document.querySelectorAll('.zoom-button').forEach(button => button.addEventListener('click', () => {
  lastTrigger = button;
  document.querySelector('#dialog-image').src = button.dataset.image;
  document.querySelector('#dialog-image').alt = button.dataset.title;
  document.querySelector('#dialog-title').textContent = button.dataset.title;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if(event.target === dialog) dialog.close();});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  lastTrigger?.focus({preventScroll:true});
});
