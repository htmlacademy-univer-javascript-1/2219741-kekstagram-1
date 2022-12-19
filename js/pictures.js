import { onPictureClick } from './full-picture.js';

const pictures = document.querySelector('.pictures');
const picturesTimplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
  const element = picturesTimplate.cloneNode(true);

  element.querySelector('.picture__img').src = photo.url;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;

  element.addEventListener('click', () => { onPictureClick(photo);});

  return element;
};

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });
  pictures.appendChild(fragment);
};

export {renderPhotos};
