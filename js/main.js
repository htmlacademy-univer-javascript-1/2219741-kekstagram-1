import { renderPhotos } from './pictures.js';
import { sendRequest} from './fetch.js';
import {showAlert} from './utils.js';

const onSuccess = (data) => {
  renderPhotos(data);
};

const onFail = (error) =>{
  showAlert(error);
};

const method = 'GET';

sendRequest(onSuccess, onFail, method);
