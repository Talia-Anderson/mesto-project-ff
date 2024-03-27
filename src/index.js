
 import './index.css';
 import {formProfileElement, nameInput, jobInput, profileAddCard,formAddCardElement, closePopup, openPopup, handleFormSubmit, handleCardSubmit} from './components/modal.js';
 import {add} from './components/card.js'

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

//добавление карточки

initialCards.forEach(add);

/*кнопки попапов*/

const editProfileButton = document.querySelector('.profile__edit-button');
const editWindow = document.querySelector('.popup_type_edit');

const profileAddButton = document.querySelector('.profile__add-button');

const modals = Array.from(document.querySelectorAll('.popup'));


editProfileButton.addEventListener('click', () => {
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editWindow)
});

profileAddButton.addEventListener('click', () => openPopup(profileAddCard));


modals.forEach(modal => {
  modal.querySelector('.popup__close').addEventListener('click', () => closePopup(modal));
  window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closePopup(modal);
  }
  })
});


formProfileElement.addEventListener('submit', handleFormSubmit); 

formAddCardElement.addEventListener('submit', handleCardSubmit);


