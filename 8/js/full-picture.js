const bigPicture = document.querySelector('.big-picture');
const commentsBigPicture = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const createCommentItem = (commentData) => {
  const liElement = document.createElement('li');
  const imgElement = document.createElement('img');
  const pElement = document.createElement('p');

  imgElement.classList.add('social__picture');
  imgElement.src = commentData.avatar;
  imgElement.alt = commentData.name;
  imgElement.width = 35;
  imgElement.height = 35;

  pElement.classList.add('social__text');
  pElement.textContent = commentData.message;

  liElement.classList.add('social__comment');
  liElement.appendChild(imgElement);
  liElement.appendChild(pElement);

  return liElement;
};

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
  bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;

  const lastComments = commentsBigPicture.querySelectorAll('.social__comment');
  lastComments.forEach((lastComment) => {commentsBigPicture.removeChild(lastComment);});

  pictureData.comments.forEach((comment) => {
    commentsBigPicture.appendChild(createCommentItem(comment));
  });

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

export{onPictureClick};
