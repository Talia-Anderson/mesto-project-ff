
 import './index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.places__list');

// @todo: Функция создания карточкиc
initialCards.forEach(initialCards => {
  const card = addCard(initialCards.link, initialCards.name);

  content.prepend(card);

});

function addCard(imgLink, imgName) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const altTxt = imgLink;

  cardElement.querySelector('.card__image').src = imgLink;
  cardElement.querySelector('.card__image').alt = altTxt;
  // cardElement.querySelector('.card__description').textContent = descriptionValue;
  cardElement.querySelector('.card__title').textContent = imgName;

  const delBtn = cardElement.querySelector('.card__delete-button');
  delBtn.addEventListener('click',delCard);

  return cardElement;
}

/*просто для проверки работоспособности*/
const addButton = document.querySelector('.profile__add-button');
  addButton.addEventListener('click', function (event) {
  console.log('Произошло событие');
})

// @todo: Функция удаления карточки

function delCard(event) {
  const listPoint = event.target.closest('.places__item');
  listPoint.remove();
}

// @todo: Вывести карточки на страницу
