// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.places__list')

// @todo: Функция создания карточки
initialCards.forEach(function (item) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = item.link;
  // cardElement.querySelector('.card__description').textContent = descriptionValue;
  cardElement.querySelector('.card__title').textContent = item.name;

  const delBtn = cardElement.querySelector('.card__delete-button');
  delBtn.addEventListener('click',delCard);

  content.prepend(cardElement);

});

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
