import { renderPhotos } from './pictures.js';
import { showFilters } from './filters.js';

let pictures = [];

const onRecieveSuccess = (data) => {
  pictures = data.slice();
  renderPhotos(data);
  showFilters();
};

export {pictures, onRecieveSuccess};
