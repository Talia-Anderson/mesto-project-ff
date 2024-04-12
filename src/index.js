
 import './index.css';
 import { initialCards } from './components/cards.js';
 import {closePopup, openPopup} from './components/modal.js';
 import {newCard, likeCard, delCard} from './components/card.js'
 import { enableValidation, clearValidation } from './components/validation.js';
//добавление карточки

const content = document.querySelector('.places__list');

initialCards.forEach(addCard);

function addCard(cardData) {
  const card = newCard(cardData, delCard, likeCard, openImgPopup);
  content.prepend(card);
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

// const avatar = document.querySelector('.profile__image');
// const changeAvatar = document.querySelector('.')

// avatar.addEventListener('mouseclick', function() {
//   avatar.classList.add('overlay');
// })

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
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = formAddCardElement.querySelector('.popup__input_type_card-name');
  const linkInput = formAddCardElement.querySelector('.popup__input_type_url');
  const formedLink = new URL(linkInput.value, import.meta.url)
  const cardInfo = 
    {
      name: cardNameInput.value,
      link: formedLink
    };
  
  addCard(cardInfo);
  closePopup(popupAddCard);
}

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

fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
   headers: {
     authorization: 'b0363792-c5e5-45fc-92f6-19570476fd4f'
   }
 })
   .then(res => res.json())
   .then((result) => {
     console.log(result.avatar);
     const JSONName = JSON.stringify(result.name);
     const JSONAbout = JSON.stringify(result.about);
     const JSONAvatar = JSON.stringify(result.avatar);
     document.querySelector('#name').innerHTML = JSONName;
     document.querySelector('#about').innerHTML = JSONAbout;
     document.querySelector('#avatar').style.backgroundImage = `url(${result.avatar})`;
   }); 