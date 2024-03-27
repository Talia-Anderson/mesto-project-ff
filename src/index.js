
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

// @todo: DOM узлы
const content = document.querySelector('.places__list');

// @todo: Функция создания карточки
initialCards.forEach(add);

function add(cardData) {
  const card = newCard(cardData, delCard, likeCard, openImgPopup);
  content.prepend(card);
}

function newCard(cardData, delCard, likeCard, imgPopup) {
  const temp = document.querySelector('#card-template').content;
  const elem = temp.querySelector('.card').cloneNode(true);
  const title = elem.querySelector('.card__title');
  const img = elem.querySelector('.card__image');
  const delBtn = elem.querySelector('.card__delete-button');
  const likeBtn = elem.querySelector('.card__like-button');

  img.src = cardData.link;
  img.alt = cardData.name;
  title.textContent = cardData.name;

  delBtn.addEventListener('click', delCard);
  likeBtn.addEventListener('click', likeCard);

  img.addEventListener('click', (evt) => {
    imgPopup(cardData);
  });

  return elem;
}

const cardImg = document.querySelector('.popup_type_image');

function openImgPopup(data) {
  const cardTxt = cardImg.querySelector('.popup__caption');
  const cardPic = cardImg.querySelector('.popup__image');

  cardTxt.textContent = data.name;
  cardPic.src = data.link;
  cardPic.alt = data.name;

  openPopup(cardImg);
} 

// @todo: Функция удаления карточки

function likeCard(event) {
  const addLike = event.target.closest('.card__like-button');
  addLike.classList.toggle('card__like-button_is-active');
}

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
  modal.classList.remove('popup_is-animated');
  document.removeEventListener('keydown', handleClickEsc);
}

function openPopup(modal) {
  
  modal.classList.add('popup_is-opened');
  modal.classList.add('popup_is-animated');
  document.addEventListener('keydown', handleClickEsc);
}

editProfileButton.addEventListener('click', () => openPopup(editWindow));
profileAddButton.addEventListener('click', () => openPopup(profileAddCard));


modals.forEach(modal => {
  modal.querySelector('.popup__close').addEventListener('click', () => closePopup(modal));
  window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closePopup(modal);
  }
  })
});
 
//сабмит


const formProfileElement = editWindow.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const submitProfileBtn = formProfileElement.querySelector('.popup__button');

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  submitProfileBtn.addEventListener('click', handleClickEsc);
}

formProfileElement.addEventListener('submit', handleFormSubmit); 


//добавление карточки

const formAddCardElement = profileAddCard.querySelector('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
const formedURL = new URL(linkInput.value, import.meta.url)
const cardInfo = [
{
  name: cardNameInput.value,
  link: formedURL,
}
]

console.log(cardInfo);

const submitAddCardBtn = formProfileElement.querySelector('.popup__button');


function handleCardSubmit(evt) {
  evt.preventDefault();
  add(cardInfo);
  submitAddCardBtn.addEventListener('click', handleClickEsc);
}

formAddCardElement.addEventListener('submit', handleCardSubmit);

/*просто для проверки работоспособности*/
// const addButton = document.querySelector('.profile__edit-button');
//   addButton.addEventListener('click', function (event) {
//   console.log('Произошло событие');
// });

