
import {add} from './card.js'

const cardImg = document.querySelector('.popup_type_image');

const editWindow = document.querySelector('.popup_type_edit');
const profileAddCard = document.querySelector('.popup_type_new-card');

const formAddCardElement = profileAddCard.querySelector('.popup__form');

const submitAddCardBtn = profileAddCard.querySelector('.popup__button');
const submitProfileBtn = editWindow.querySelector('.popup__button');

const formProfileElement = editWindow.querySelector('.popup__form');
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');


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

function openImgPopup(data) {
  const cardTxt = cardImg.querySelector('.popup__caption');
  const cardPic = cardImg.querySelector('.popup__image');

  cardTxt.textContent = data.name;
  cardPic.src = data.link;
  cardPic.alt = data.name;

  openPopup(cardImg);
} 

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  submitProfileBtn.addEventListener('click', () => closePopup(editWindow));
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
  
  add(cardInfo);
  submitAddCardBtn.addEventListener('click', () => closePopup(profileAddCard));
}

export {formProfileElement, nameInput, jobInput, profileAddCard,formAddCardElement, handleClickEsc, closePopup, openPopup, openImgPopup, handleFormSubmit, handleCardSubmit}