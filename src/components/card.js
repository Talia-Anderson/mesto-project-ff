
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

  delBtn.addEventListener('click', function(){delCard(event, cardData.cardID)});
  likeBtn.addEventListener('click', function(){likeCard(event, cardData.cardID, counterField)});

  counterField.innerHTML = cardData.likes;

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
  fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${ID}`, {
  method: 'PUT',
  headers: {
    authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820',
    'Content-Type': 'application/json'
  },
  })
  .then(res => res.json())
  .then (res => {
    console.log(res);
    addLike.classList.add('card__like-button_is-active');
    card.innerHTML = res.likes.length;
  });

  fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${ID}`, {
  method: 'DELETE',
  headers: {
    authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820',
    'Content-Type': 'application/json'
  },
  })
  .then(res => res.json())
  .then (res => {
    addLike.classList.remove('card__like-button_is-active');
    card.innerHTML = res.likes.length;
  });
  
  
}

function delCard(event, ID) {
  const listPoint = event.target.closest('.places__item');
  listPoint.remove();
  console.log(ID);

  fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/${ID}`, {
  method: 'DELETE',
  headers: {
    authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820',
    'Content-Type': 'application/json'
    },
  })
  .then(console.log('it works'))
  .catch(console.log('it doesent work')) 
}

export {newCard, likeCard, delCard};