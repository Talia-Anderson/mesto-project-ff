
 import './index.css';
 import {addInitialCards, addNewAvatar, addNewCard, addNewProfileInfo, getProfileData} from './components/api.js';
 import {closePopup, openPopup} from './components/modal.js';
 import {newCard, likeCard, delCard} from './components/card.js'
 import { enableValidation, clearValidation } from './components/validation.js';
//добавление карточки

const content = document.querySelector('.places__list');

export function addCard(cardData) {
  const card = newCard(cardData, delCard, likeCard, openImgPopup);
  content.append(card);
}

/*кнопки попапов*/
const cardImg = document.querySelector('.popup_type_image');

const editProfileButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const modals = Array.from(document.querySelectorAll('.popup'));

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');

const formAddCardElement = popupAddCard.querySelector('.popup__form');

const formProfileElement = popupEditProfile.querySelector('.popup__form');
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');

const openAvatarButton = document.querySelector('.overlay');
const popupChangeAvatar = document.querySelector('.popup_type_new-avatar');
const formChangeAvatar = popupChangeAvatar.querySelector('.popup__form');
const avatartURLInput = formChangeAvatar.querySelector('#popup__input-avatar');

const closeAvatar = popupChangeAvatar.querySelector('.popup__button');
const closeProfile = popupEditProfile.querySelector('.popup__button');
const closeCard = popupAddCard.querySelector('.popup__button');

//изменение аватара

function submitAvatarURL(evt) {
   
  evt.preventDefault();
  addNewAvatar(avatartURLInput);
  closeAvatar.textContent = 'Сохранение...';
  closePopup(popupChangeAvatar);
};

// открытие попапа аватара

openAvatarButton.addEventListener('click', () => {
  openPopup(popupChangeAvatar);
});

// открытие попапа картинки

function openImgPopup(data) {
  const cardTxt = cardImg.querySelector('.popup__caption');
  const cardPic = cardImg.querySelector('.popup__image');

  cardTxt.textContent = data.name;
  cardPic.src = data.link;
  cardPic.alt = data.name;
  openPopup(cardImg);
} 

// открытие попапа профиля

editProfileButton.addEventListener('click', () => {
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile)
});

// открытие попапа карточки

profileAddButton.addEventListener('click', () => openPopup(popupAddCard));

// закрытие модалок

modals.forEach(modal => {
  modal.querySelector('.popup__close').addEventListener('click', () => closePopup(modal));
  window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closePopup(modal);
  }
  })
});

// сабмит изменений профиля

function submitEditProfileForm(evt) {
  evt.preventDefault();
  addNewProfileInfo(nameInput, jobInput);
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closeProfile.textContent = 'Сохранение...';
  closePopup(popupEditProfile);
}

// сабмит карточки

function handleCardSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = formAddCardElement.querySelector('.popup__input_type_card-name');
  const linkInput = formAddCardElement.querySelector('.popup__input_type_url');
  let cardInfo;
  addNewCard(closePopup, addCard, cardInfo, closeCard, cardNameInput, linkInput, popupAddCard);
}

// работа с формами

formChangeAvatar.addEventListener('submit', submitAvatarURL)

formProfileElement.addEventListener('submit', submitEditProfileForm); 

formAddCardElement.addEventListener('submit', handleCardSubmit);

// валидация
let classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

enableValidation(classes); 

//clearValidation(document.querySelector('.popup__form'));

//запрос для профиля

getProfileData();

// запрос для добавления уже имеющихся карточек

addInitialCards(addCard);



