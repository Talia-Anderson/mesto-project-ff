
import {setLike, delLike, delCardFromServer} from './api.js';

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

  console.log(cardData.likes);
  counterField.textContent = cardData.likes.length;

  if (MyLike(cardData)) {
    likeBtn.classList.toggle('card__like-button_is-active');
  };

  delBtn.addEventListener('click', function(){delCard(event, cardData.cardID)});
  
  likeBtn.addEventListener('click', function()
  {
    likeCard(likeBtn, cardData.cardID, counterField);

  });

  if(cardData.ownerID === 'a93de75c814e52d57e28a89d') {
    delBtn.classList.remove('hidden');
  }

  img.addEventListener('click', (evt) => {
    imgPopup(cardData);
  });

  return elem;

}

function likeCard(likeBtn, ID, card) {
  //isMyLike(ID);
  if (likeBtn.classList.contains('card__like-button_is-active')) {
    delLike(ID, likeBtn, card);
  }
  else {
    setLike(ID, likeBtn, card);
  }
  
};

function delCard(event, ID) {
  const listPoint = event.target.closest('.places__item');
  listPoint.remove();
  delCardFromServer(ID);
}

function MyLike(card) {
  let likeFlag = false;
      for (let i = 0; i < card.likes.length && likeFlag != true; i+=1) {
        if (card.likes[i]._id === 'a93de75c814e52d57e28a89d')
        {
           likeFlag = true;
        }
      };

      return likeFlag;
};

export {newCard, likeCard, delCard};