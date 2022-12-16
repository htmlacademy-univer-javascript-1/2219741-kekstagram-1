import { setComments } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const onCloseButtonClick = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('click', onCloseButtonClick);
};

const onDocumentEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', onDocumentEscKeydown);
  }
};

const onPictureClick = (pictureData) => {
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPicture.querySelector('.likes-count').textContent = pictureData.likes;

  bigPicture.querySelector('.social__caption').textContent = pictureData.description;

  setComments(pictureData.comments);
  document.querySelector('body').classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

export{onPictureClick};
