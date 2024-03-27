
import {openImgPopup} from './modal.js';

const content = document.querySelector('.places__list');

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

function likeCard(event) {
  const addLike = event.target.closest('.card__like-button');
  addLike.classList.toggle('card__like-button_is-active');
}

 function delCard(event) {
   const listPoint = event.target.closest('.places__item');
   listPoint.remove();
 }

export {add, likeCard, delCard};