const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const dialogs = document.querySelectorAll('dialog');
function openDialog(dialog) {
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.scrollTop = 0;
}
dialogs.forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
});
document.querySelectorAll('[data-open]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    openDialog(document.getElementById(link.dataset.open));
  });
});

const photos = [...document.querySelectorAll('[data-gallery]')];
const galleryDialog = document.querySelector('#gallery-dialog');
const galleryImage = document.querySelector('#gallery-full-image');
let photoIndex = 0;
function showPhoto(index) {
  photoIndex = (index + photos.length) % photos.length;
  const source = photos[photoIndex];
  galleryImage.src = source.href;
  galleryImage.alt = source.querySelector('img').alt;
  document.querySelector('#gallery-caption').textContent = source.dataset.caption;
  document.querySelector('#gallery-counter').textContent = `${photoIndex + 1} / ${photos.length}`;
}
photos.forEach((photo, index) => photo.addEventListener('click', event => {
  event.preventDefault();
  showPhoto(index);
  openDialog(galleryDialog);
}));
document.querySelector('#gallery-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
document.querySelector('#gallery-next').addEventListener('click', () => showPhoto(photoIndex + 1));
galleryDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(photoIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
