
 import './index.css';
 import { initialCards } from './components/cards.js';
 import {closePopup, openPopup} from './components/modal.js';
 import {newCard, likeCard, delCard} from './components/card.js'
 import { enableValidation, clearValidation } from './components/validation.js';
//добавление карточки

const content = document.querySelector('.places__list');

// initialCards.forEach(addCard);

function addCard(cardData) {
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

// const avatar = document.querySelector('.profile__image');
// const changeAvatar = document.querySelector('.')

// avatar.addEventListener('mouseclick', function() {
//   avatar.classList.add('overlay');
// })

function submitAvatarURL(evt) {
   
  evt.preventDefault();
  fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me/avatar', {
  method: 'PATCH',
  headers: {
    authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820',
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({
    avatar: avatartURLInput.value
  })
  })
  .then(res => res.json())
  .then((result) => {
     document.querySelector('#avatar').style.backgroundImage = `url(${result.avatar})`;
   }); 
  closePopup(popupChangeAvatar);
};

openAvatarButton.addEventListener('click', () => {
  openPopup(popupChangeAvatar);
});

function openImgPopup(data) {
  const cardTxt = cardImg.querySelector('.popup__caption');
  const cardPic = cardImg.querySelector('.popup__image');

  cardTxt.textContent = data.name;
  cardPic.src = data.link;
  cardPic.alt = data.name;

  openPopup(cardImg);
} 

editProfileButton.addEventListener('click', () => {
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile)
});

profileAddButton.addEventListener('click', () => openPopup(popupAddCard));

modals.forEach(modal => {
  modal.querySelector('.popup__close').addEventListener('click', () => closePopup(modal));
  window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closePopup(modal);
  }
  })
});

function submitEditProfileForm(evt) {
  evt.preventDefault();
  fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameInput.value,
    about: jobInput.value
  })
  })
  .then(res => res.json()); 

  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = formAddCardElement.querySelector('.popup__input_type_card-name');
  const linkInput = formAddCardElement.querySelector('.popup__input_type_url');
  let cardInfo;
  
  fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
  method: 'POST',
  headers: {
    authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820',
    'Content-Type': 'application/json'
    },
  body: JSON.stringify({
    name: cardNameInput.value,
    link: linkInput.value
  })
  })
  .then(res => res.json())
  .then (res => {
    cardInfo = {
      name: res.name,
      link: res.link,
      likes: res.likes.length,
      ownerID: res.owner._id,
      cardID: res._id
    };
    addCard(cardInfo);
    closePopup(popupAddCard);
  })
}

formChangeAvatar.addEventListener('submit', submitAvatarURL)

formProfileElement.addEventListener('submit', submitEditProfileForm); 

formAddCardElement.addEventListener('submit', handleCardSubmit);

//sprint 7

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 

// clearValidation(document.querySelector('.popup__form'));

//api

//запрос для профиля

fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
   headers: {
     authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820'
   }
 })
   .then(res => res.json())
   .then((result) => {
     const JSONName = JSON.stringify(result.name);
     const JSONAbout = JSON.stringify(result.about);
     document.querySelector('#name').innerHTML = JSONName;
     document.querySelector('#about').innerHTML = JSONAbout;
     document.querySelector('#avatar').style.backgroundImage = `url(${result.avatar})`;
   }); 

// запрос для добавления уже имеющихся карточек

   fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
    headers: {
      authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820'
    }
  })
    .then(res => res.json())
    .then((results) => {
      results.forEach((result) => {
        
        const JSONLink = new URL(result.link, import.meta.url);
        const JSONName = JSON.stringify(result.name);
        const JSONCardInfo = {
          name: JSONName,
          link: JSONLink,
          likes: result.likes.length,
          ownerID: result.owner._id, 
          cardID: result._id
        };
        addCard(JSONCardInfo);

      });
      
    })
   
// запрос для добавления лайка


