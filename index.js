'use strict';

import imageList from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const lightbox = document.querySelector('.lightbox');
const imageModalWindow = document.querySelector('.lightbox___image');
const content = document.querySelector('.lightbox__content');
const closeButton = document.querySelector('.material-icons');

const createLi = item => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href='${item.preview}'
  >
    <img
      class="gallery__image"
      src='${item.preview}'
      data-source=""
      alt='${item.description}'
    />

    <span class="gallery__icon">
      <i class="material-icons">zoom_out_map</i>
    </span>
  </a>
</li>`;
};
const createLiInGallery = imageList.reduce((acc, item) => {
  acc += createLi(item);
  return acc;
}, '');
gallery.insertAdjacentHTML('beforeend', createLiInGallery);

gallery.addEventListener('click', e => {
  event.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }
  handleClick(e);
});

closeButton.addEventListener('click', e => {
  if (e.target !== e.currentTarget) {
    return;
  }
  lightbox.classList.remove('is-open');
});

content.addEventListener('click', handleOverlayClick);

function handleOverlayClick(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', handleKeyPress);
}

function handleClick(e) {
  event.preventDefault();
  lightbox.classList.add('is-open');
  window.addEventListener('keydown', handleKeyPress);
  imageModalWindow.alt = `${event.target.alt}`;
  imageModalWindow.src = `${event.target.src}`;
}

function handleKeyPress(e) {
  if (event.code !== 'Escape') {
    return;
  }
  lightbox.classList.remove('is-open');
}
