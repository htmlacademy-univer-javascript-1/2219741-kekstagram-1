import { getRandomInt } from './util.js';

const COUNT_PHOTOS = 25;
const COUNT_COMMENTS = {
  min: 1,
  max: 11
};
const MAX_COMMENT_ID = 200;
const LIKES = {
  min: 15,
  max: 200
};
const DESCRIPTIONS = ['описание 1', 'описание 2', 'описание 3'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Андрей', 'Сергей', 'Константин', 'Ольга', 'Алёна', 'Виолетта'];

const usedIds = [];
const getUnicId = () => {
  let id = getRandomInt(0, MAX_COMMENT_ID);
  while (id in usedIds)
  {
    id = getRandomInt(0, MAX_COMMENT_ID);
  }
  usedIds.push(id);
  return id;
};

const getComment = () => ({
  id: getUnicId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInt(0, NAMES.length - 1)]
});

const getPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInt(LIKES.min, LIKES.max),
  comments: Array.from({length: getRandomInt(COUNT_COMMENTS.min, COUNT_COMMENTS.max)}, getComment)
});

const getPhotosArray = () => {
  const photos = [];
  for (let i = 1; i <= COUNT_PHOTOS; i++) {
    photos.push(getPhoto(i));
  }
  return photos;
};

export{getPhotosArray};
