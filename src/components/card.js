
import {config} from './api.js';

function newCard(cardData, delCard, likeCard, imgPopup) {
  
  const cardTemplate = document.querySelector('#card-template').content;
  const elem = cardTemplate.querySelector('.card').cloneNode(true);
  const title = elem.querySelector('.card__title');
  const img = elem.querySelector('.card__image');
  const delBtn = elem.querySelector('.card__delete-button');
  const likeBtn = elem.querySelector('.card__like-button');

  img.src = cardData.link;
  img.alt = cardData.name;
  title.textContent = cardData.name;

  const counterField = elem.querySelector('#counter');

  counterField.innerHTML = cardData.likes;

  delBtn.addEventListener('click', function(){delCard(event, cardData.cardID)});
  likeBtn.addEventListener('click', function(){likeCard(event, cardData.cardID, counterField)});

  if(cardData.ownerID === 'a93de75c814e52d57e28a89d') {
    delBtn.classList.remove('hidden');
  }

  img.addEventListener('click', (evt) => {
    imgPopup(cardData);
  });

  return elem;

}

function likeCard(event, ID, card) {
  const addLike = event.target.closest('.card__like-button');
  
  if (addLike.classList.contains('card__like-button_is-active')) {
    fetch(`${config.baseUrl}/cards/likes/${ID}`, {
      method: 'DELETE',
      headers: config.headers,
      })
      .then(res => res.json())
      .then (res => {
        addLike.classList.remove('card__like-button_is-active');
        card.innerHTML = res.likes.length;
      });
  }
  else {
    fetch(`${config.baseUrl}/cards/likes/${ID}`, {
      method: 'PUT',
      headers: config.headers,
      })
      .then(res => res.json())
      .then (res => {
        addLike.classList.add('card__like-button_is-active');
        card.innerHTML = res.likes.length;
      });
  }

}

function delCard(event, ID) {
  const listPoint = event.target.closest('.places__item');
  listPoint.remove();

  fetch(`${config.baseUrl}/cards/${ID}`, {
  method: 'DELETE',
  headers: config.headers,
  }); 
}

export {newCard, likeCard, delCard};