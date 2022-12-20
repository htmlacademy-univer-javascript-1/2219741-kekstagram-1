import { onRecieveSuccess } from './upload-data.js';
import { sendRequest } from './fetch.js';
import { showAlert } from './utils.js';

const onSuccess = (data) => {
  onRecieveSuccess(data);
};

const onFail = (error) =>{
  showAlert(error);
};

const method = 'GET';

sendRequest(onSuccess, onFail, method);
