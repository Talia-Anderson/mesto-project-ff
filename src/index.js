
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
function closePopup(modal) {
  modal.classList.remove('popup_is-opened');
  window.removeEventListener('keydown', closePopup);
}

function close(modal) {
  modal.addEventListener('click', function() {
    closePopup(modal);
  });
}

const editProfileButton = document.querySelector('.profile__edit-button');
const editWindow = document.querySelector('.popup_type_edit');

editProfileButton.addEventListener('click', function(){
    editWindow.classList.add('popup_is-opened');
    window.addEventListener('keydown', closePopup);
});

const profileAddButton = document.querySelector('.profile__add-button');
const profileAddCard = document.querySelector('.popup_type_new-card');

profileAddButton.addEventListener('click', function() 
  {
    profileAddCard.classList.add('popup_is-opened');
    window.addEventListener('keydown', closePopup);
  });

close(profileAddCard);
close(editWindow);

document.addEventListener('keydown', function(evt) {
  if(evt.key === 'Escape') {
    closePopup(editWindow);
  }
});

document.addEventListener('keydown', function(evt) {
  if(evt.key === 'Escape') {
    closePopup(profileAddCard);
  }
});

// const card = document.querySelector('.card');

// card.addEventListener('click', function(evt) {
//   if(evt.target.classList.contains('card__like-button')) {
//     evt.target.classList.toggle('.card__like-button_is-active');
//   }
// });







/*просто для проверки работоспособности*/
// const addButton = document.querySelector('.profile__edit-button');
//   addButton.addEventListener('click', function (event) {
//   console.log('Произошло событие');
// });

