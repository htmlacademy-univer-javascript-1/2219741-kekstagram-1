import { setScale } from './scaler.js';
import { setEffects } from './effects.js';
import { sendRequest } from './fetch.js';
import { showSuccessMessage, showErrorMessage, addPostMessages} from './post-massages.js';
import { uploadUserPicture } from './user-picture.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
const formInput = document.querySelector('.img-upload__input');
const exitButton = form.querySelector('#upload-cancel');
const uploadingControl = form.querySelector('#upload-file');

const closeForm = () => {
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();
};

function onExitButtonClick() {
  closeForm();
  exitButton.removeEventListener('click', onExitButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

function onDocumentEscKeydown(evt){
  if (evt.key === 'Escape' && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    closeForm();
    exitButton.removeEventListener('click', onExitButtonClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }
}

const onFormInput = () => {
  formOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  exitButton.addEventListener('click', onExitButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  setEffects();
  setScale();
};

const onUploadClick = () => {
  uploadUserPicture(uploadingControl.files[0]);

  formOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  setScale();
  setEffects();
};

const uploadForm = () => {
  uploadingControl.addEventListener('change', onUploadClick);
  addPostMessages();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendRequest(showSuccessMessage, showErrorMessage, 'POST', new FormData(form));
};

formInput.oninput = onFormInput;
form.addEventListener('submit', onFormSubmit);

export{ closeForm, uploadForm};
