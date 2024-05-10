
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

const imageModal = document.querySelector('.popup_type_image');

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

const avatarSubmitButton = popupChangeAvatar.querySelector('.popup__button');
const profileSubmitButton = popupEditProfile.querySelector('.popup__button');
const cardSubmitButton = popupAddCard.querySelector('.popup__button');

const avatarField = document.querySelector('#avatar');
const aboutField = document.querySelector('#about') ;
const nameField = document.querySelector('#name');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const cardTxt = imageModal.querySelector('.popup__caption');
const cardPic = imageModal.querySelector('.popup__image');

const cardNameInput = formAddCardElement.querySelector('.popup__input_type_card-name');
const linkInput = formAddCardElement.querySelector('.popup__input_type_url');

//изменение аватара

function submitAvatarURL(evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = 'Сохранение...';
  addNewAvatar(avatartURLInput)
  .then((result) => {
    avatarField.style.backgroundImage = `url(${result.avatar})`;
    closePopup(popupChangeAvatar);
  })
  .catch((err) => console.log(err))
  .finally(err =>  avatarSubmitButton.textContent = 'Сохранить')
};

// открытие попапа аватара

openAvatarButton.addEventListener('click', () => {
  openPopup(popupChangeAvatar);
  clearValidation(formChangeAvatar, classes);
});

// открытие попапа картинки

function openImgPopup(data) {
  cardTxt.textContent = data.name;
  cardPic.src = data.link;
  cardPic.alt = data.name;
  openPopup(imageModal);
} 

// открытие попапа профиля

editProfileButton.addEventListener('click', () => {
  clearValidation(formProfileElement, classes);
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

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileSubmitButton.textContent = 'Сохранение...';
  addNewProfileInfo(nameInput, jobInput)
  .then ((res) => {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEditProfile)
  })
  .catch((err) => console.log(err))
  .finally(err => profileSubmitButton.textContent = 'Сохранить')
}

// сабмит карточки

function handleCardSubmit(evt) {
  evt.preventDefault();
  let cardInfo;
  cardSubmitButton.textContent = 'Сохранение...';
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
      cardSubmitButton.textContent = 'Сохранить'
    })
    .catch((err) => console.log(err))
}

// работа с формами

formChangeAvatar.addEventListener('submit', submitAvatarURL)

formProfileElement.addEventListener('submit', submitEditProfileForm); 

formAddCardElement.addEventListener('submit', handleCardSubmit);

// валидация

enableValidation(classes); 


// запрос для добавления уже имеющихся карточек и информации профиля


Promise.all([getProfileData(), addInitialCards()])
  .then((values) => {
    nameField.textContent = values[0].name;
    aboutField.textContent = values[0].about;
    avatarField.style.backgroundImage = `url(${values[0].avatar})`;
    userID = values[0]._id;
    
    values[1].forEach((card) => {

      const cardInfo = {
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
