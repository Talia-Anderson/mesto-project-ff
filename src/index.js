
 import './index.css';

  const Arkhyz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url)
  const Chelyaba = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url)
  const Ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url)
  const Kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url)
  const KholmogorskyDistict = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url)
  const Baykal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url)

 const initialCards = [
  {
    name: "Архыз",
    link: Arkhyz,
  },
  {
    name: "Челябинская область",
    link: Chelyaba,
  },
  {
    name: "Иваново",
    link: Ivanovo,
  },
  {
    name: "Камчатка",
    link: Kamchatka,
  },
  {
    name: "Холмогорский район",
    link: KholmogorskyDistict,
  },
  {
    name: "Байкал",
    link: Baykal,
  }
];

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.places__list');

// @todo: Функция создания карточки
initialCards.forEach(initialCards => {
  const card = addCard(initialCards.link, initialCards.name);
  content.prepend(card);
  like();
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

// @todo: Функция удаления карточки


 function delCard(event) {
   const listPoint = event.target.closest('.places__item');
   listPoint.remove();
 }

// @todo: Вывести карточки на страницу


/*кнопки*/

const editProfileButton = document.querySelector('.profile__edit-button');
const editWindow = document.querySelector('.popup_type_edit');

const profileAddButton = document.querySelector('.profile__add-button');
const profileAddCard = document.querySelector('.popup_type_new-card');

const cardImg = document.querySelector('.popup_type_image');
const cardBtn = document.querySelector('.places__item');

const modals = Array.from(document.querySelectorAll('.popup'));

function handleClickEsc(evt) {
  if(evt.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closePopup(modal);
  }
  else if (evt.type === 'click') {
    const modal = document.querySelector('.popup_is-opened');
    closePopup(modal);
  }
}

function closePopup(modal) {
  
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleClickEsc);
}

function openPopup(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleClickEsc);
}

editProfileButton.addEventListener('click', () => openPopup(editWindow));
profileAddButton.addEventListener('click', () => openPopup(profileAddCard));
cardBtn.addEventListener('click', () => openPopup(cardImg));


modals.forEach(modal => {
  modal.querySelector('.popup__close').addEventListener('click', () => closePopup(modal));
  window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closePopup(modal);
  }
  })
});

// лайк

function like() {
  content.querySelector('.card__like-button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('card__like-button_is-active')
});
}
 
//сабмит

const submitBtn = document.querySelector('.popup__button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  submitBtn.addEventListener('click', handleClickEsc);
}

formElement.addEventListener('submit', handleFormSubmit); 


//добавление карточки

const cardNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

function handleCardSubmit(evt) {
  evt.preventDefault();
  console.log(linkInput.value);
  addCard(linkInput.value, cardNameInput.value);
  submitBtn.addEventListener('click', handleClickEsc);
}

formElement.addEventListener('submit', handleCardSubmit);

/*просто для проверки работоспособности*/
// const addButton = document.querySelector('.profile__edit-button');
//   addButton.addEventListener('click', function (event) {
//   console.log('Произошло событие');
// });

