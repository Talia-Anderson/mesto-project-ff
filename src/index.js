
 import './index.css';
 import {addInitialCards, addNewAvatar, addNewCard, addNewProfileInfo, getProfileData} from './components/api.js';
 import {closePopup, openPopup} from './components/modal.js';
 import {createCard, likeCard, delCard} from './components/card.js'
 import { enableValidation, clearValidation } from './components/validation.js';
//добавление карточки

const content = document.querySelector('.places__list');

function addCard(cardData) {
  const card = createCard(cardData, delCard, likeCard, openImgPopup, userID);
  content.prepend(card);
}

/*кнопки попапов*/

const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

let userID;

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

const avatarField = document.querySelector('#avatar');
const aboutField = document.querySelector('#about') ;
const nameField = document.querySelector('#name');

//изменение аватара

function submitAvatarURL(evt) {
   
  evt.preventDefault();
  closeAvatar.textContent = 'Сохранить';
  closeAvatar.textContent = 'Сохранение...';
  addNewAvatar(avatartURLInput)
  .then((result) => {
    avatarField.style.backgroundImage = `url(${result.avatar})`;
    closePopup(popupChangeAvatar);
  })
  .catch((err) => console.log(err));
  
};

// открытие попапа аватара

openAvatarButton.addEventListener('click', () => {
  openPopup(popupChangeAvatar);
  clearValidation(formChangeAvatar, classes);
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
  clearValidation(formProfileElement, classes);
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEditProfile)

});

// открытие попапа карточки

profileAddButton.addEventListener('click', () => {
  openPopup(popupAddCard)
  clearValidation(formAddCardElement, classes);
});

// закрытие модалок

modals.forEach(modal => {
  modal.querySelector('.popup__close').addEventListener('click', () => closePopup(modal));
  modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closePopup(modal);
  }
  })
});

// сабмит изменений профиля
const profileTitle = document.querySelector('.profile__title');
const aboutTitle = document.querySelector('.profile__description');

function submitEditProfileForm(evt) {
  evt.preventDefault();
  closeProfile.textContent = 'Сохранить';
  closeProfile.textContent = 'Сохранение...';
  addNewProfileInfo(nameInput, jobInput)
  .then ((res) => {
    profileTitle.textContent = nameInput.value;
    aboutTitle.textContent = jobInput.value;
    closePopup(popupEditProfile)
  })
  .catch((err) => console.log(err));
  
}

// сабмит карточки

function handleCardSubmit(evt) {
  evt.preventDefault();
  closeCard.textContent = 'Сохранить';
  const cardNameInput = formAddCardElement.querySelector('.popup__input_type_card-name');
  const linkInput = formAddCardElement.querySelector('.popup__input_type_url');
  let cardInfo;
  closeCard.textContent = 'Сохранение...';
  addNewCard(cardNameInput, linkInput)
    .then (res => {
      cardInfo = {
        name: res.name,
        link: res.link,
        likes: res.likes,
        ownerID: res.owner._id,
        cardID: res._id
      };
    })
    .then(res => {
      addCard(cardInfo);
      closePopup(popupAddCard);
    })
    .finally (res => {
      clearValidation(classes);
    })
    .catch((err) => console.log(err))
}

// работа с формами

formChangeAvatar.addEventListener('submit', submitAvatarURL)

formProfileElement.addEventListener('submit', submitEditProfileForm); 

formAddCardElement.addEventListener('submit', handleCardSubmit);

// валидация

enableValidation(classes); 


//clearValidation(document.querySelector('.popup__form'));

// запрос для добавления уже имеющихся карточек и информации профиля


Promise.all([getProfileData(), addInitialCards()])
  .then((values) => {
    nameField.textContent = values[0].name;
    aboutField.textContent = values[0].about;
    avatarField.style.backgroundImage = `url(${values[0].avatar})`;
    userID = values[0]._id;
    
    values[1].forEach((card) => {

      let cardInfo = {
        name: card.name,
        link: card.link,
        likes: card.likes,
        ownerID: card.owner._id,
        cardID: card._id
        }
      
      addCard(cardInfo);
      
    })
    
  })
  .catch((err) => {
    console.log(err)
  })
