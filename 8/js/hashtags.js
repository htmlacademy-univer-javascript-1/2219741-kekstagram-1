const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

const formUpload = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const inputHashtag = document.querySelector('.text__hashtags');
let errorMessage = '';
const error = () => errorMessage;

const hashtagsHandler = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);
  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item)=> item.indexOf('#', 1) >= 1),
      error:'Хештеги разделяются пробелами',
    },
    {
      check: inputArray.some((item)=> item[0] !== '#'),
      error:'Хештег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, arr)=> arr.includes(item, num + 1)),
      error:'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item)=> item.length > MAX_SYMBOLS),
      error:`Максимальная длина одного хештега ${  MAX_SYMBOLS  } символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error:`Нельзя указать больше ${  MAX_HASHTAGS  } хештегов`,
    },
    {
      check: inputArray.some((item)=> !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error:'Хештег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const onHashtagInput = () => {
  submitButton.disabled = !pristine.validate();
};


pristine.addValidator(inputHashtag, hashtagsHandler, error);
inputHashtag.addEventListener('input', onHashtagInput);
formUpload.addEventListener('submit', () => {
  pristine.validate();
});
