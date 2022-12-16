const COUNT_UPLOADING_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const loadingButton = bigPicture.querySelector('.comments-loader');
const commentsCountItem = bigPicture.querySelector('.social__comment-count');
const pictureComments = bigPicture.querySelector('.social__comments');

let commentsMultiplyer = 1;

const getCommentItem = (comment) => {
  const liElement = document.createElement('li');
  const imgElement = document.createElement('img');
  const pElement = document.createElement('p');

  imgElement.classList.add('social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = 35;
  imgElement.height = 35;

  pElement.classList.add('social__text');
  pElement.textContent = comment.message;

  liElement.classList.add('social__comment');
  liElement.appendChild(imgElement);
  liElement.appendChild(pElement);

  liElement.classList.add('hidden');

  return liElement;
};

const addNewComments = () => {
  const newCommentsCount = COUNT_UPLOADING_COMMENTS * commentsMultiplyer;
  const commentsOverallCount = pictureComments.children.length;
  const addedCommentsCount = newCommentsCount >= commentsOverallCount ? commentsOverallCount : newCommentsCount;

  for(let i = 0; i < addedCommentsCount; i++) {
    if (i < newCommentsCount && i >= newCommentsCount - COUNT_UPLOADING_COMMENTS) {
      pictureComments.children[i].classList.remove('hidden');
    }
  }

  if(commentsOverallCount > newCommentsCount) {
    loadingButton.classList.remove('hidden');
  }
  else{
    loadingButton.classList.add('hidden');
  }

  commentsCountItem.innerHTML = `${addedCommentsCount} из <span class="comments-count">${commentsOverallCount}</span> комментариев`;
};

const setComments = (comments) => {
  pictureComments.innerHTML = '';
  comments.forEach((comment) => {
    pictureComments.appendChild(getCommentItem(comment));
  });
  commentsMultiplyer = 1;
  addNewComments();
};

loadingButton.addEventListener('click', () => {
  addNewComments(commentsMultiplyer++);
});

export { setComments };
