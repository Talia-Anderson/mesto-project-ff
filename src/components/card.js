
import {setLike, delLike, delCardFromServer} from './api.js';

function createCard(cardData, delCard, likeCard, handleImageClick, currentID) {
  
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

  counterField.textContent = cardData.likes.length;

  if (isMyLike(cardData, currentID)) {
    likeBtn.classList.toggle('card__like-button_is-active');
  };

  delBtn.addEventListener('click', function(event){delCard(event, cardData.cardID)});
  
  likeBtn.addEventListener('click', function()
  {
    likeCard(likeBtn, cardData.cardID, counterField);

  });

  if(cardData.ownerID === currentID) {
    delBtn.classList.remove('hidden');
  }

  img.addEventListener('click', (evt) => {
    handleImageClick(cardData);
  });

  return elem;

}

function likeCard(likeBtn, ID, card) {
  if (likeBtn.classList.contains('card__like-button_is-active')) {
    delLike(ID)
    .then (res => {
      likeBtn.classList.toggle('card__like-button_is-active');
      card.textContent = res.likes.length;
    })
    .catch((err) => console.log(err))
  }
  else {
    setLike(ID)
    .then (res => {
      likeBtn.classList.toggle('card__like-button_is-active');
      card.textContent = res.likes.length;
    })
    .catch((err) => console.log(err))
  }
  
};

function delCard(event, ID) {
  const listPoint = event.target.closest('.places__item');
  delCardFromServer(ID)
  .then ((res) => {
    listPoint.remove();
  })
}

function isMyLike(card, currentID) {
  let likeFlag = false;
      for (let i = 0; i < card.likes.length && likeFlag != true; i+=1) {
        if (card.likes[i]._id === currentID)
        {
           likeFlag = true;
        }
      };

      return likeFlag;
};

export {createCard, likeCard, delCard};