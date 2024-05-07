
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820',
    'Content-Type': 'application/json'
  }
};


export const setLike = (cardID, addLike, card) => {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers,
    })
    .then(res => {if(res.ok) {return res.json()} else {return Promise.reject(`Ошибка ${res.status}`);}})
    .catch((err) => console.log(err))
    .then (res => {
      addLike.classList.toggle('card__like-button_is-active');
      card.textContent = res.likes.length;
    });
};

export const delLike = (ID, addLike, card) => {
  fetch(`${config.baseUrl}/cards/likes/${ID}`, {
    method: 'DELETE',
    headers: config.headers,
    })
    .then(res => {if(res.ok) {return res.json()} else {return Promise.reject(`Ошибка ${res.status}`);}})
    .catch((err) => console.log(err))
    .then (res => {
      addLike.classList.toggle('card__like-button_is-active');
      card.textContent = res.likes.length;
    });
};

export const delCardFromServer = (ID) => {
  fetch(`${config.baseUrl}/cards/${ID}`, {
    method: 'DELETE',
    headers: config.headers,
    });
};

export const addInitialCards = (addCard) => {
  fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {if(res.ok) {return res.json()} else {return Promise.reject(`Ошибка ${res.status}`);}})
    .catch((err) => console.log(err))
    .then((results) => {
      results.forEach((result) => {
        const JSONLink = new URL(result.link, import.meta.url);
        const JSONName = result.name;
        const JSONCardInfo = {
          name: JSONName,
          link: JSONLink,
          likes: result.likes,
          ownerID: result.owner._id, 
          cardID: result._id
        };
        addCard(JSONCardInfo);
      });
      
    })
};

export const getProfileData = () => {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {if(res.ok) {return res.json()} else {return Promise.reject(`Ошибка ${res.status}`);}})
    .catch((err) => console.log(err))
     .then((result) => {
      const JSONName = result.name;
      const JSONAbout = result.about;
      document.querySelector('#name').textContent = JSONName;
      document.querySelector('#about').textContent = JSONAbout;
      document.querySelector('#avatar').style.backgroundImage = `url(${result.avatar})`;
    }); 
};

export const addNewCard = (closePopup, addCard, cardInfo, closeCard, cardNameInput, linkInput, popupAddCard) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: linkInput.value
    })
    })
    .then(res => {if(res.ok) {return res.json()} else {return Promise.reject(`Ошибка ${res.status}`);}})
    .catch((err) => console.log(err))
    .then (res => {
      cardInfo = {
        name: res.name,
        link: res.link,
        likes: res.likes.length,
        ownerID: res.owner._id,
        cardID: res._id
      };
    })
    .then(res => {
      addCard(cardInfo);
      closeCard.textContent = 'Сохранение...';
      closePopup(popupAddCard);
    })
};

export const addNewProfileInfo = (nameInput, jobInput) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
    })
    .then(res => {if(res.ok) {return res.json()} else {return Promise.reject(`Ошибка ${res.status}`);}})
    .catch((err) => console.log(err))
};

export const addNewAvatar = (avatartURLInput) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
     body: JSON.stringify({
      avatar: avatartURLInput.value
    })
    })
    .then(res => {if(res.ok) {return res.json()} else {return Promise.reject(`Ошибка ${res.status}`);}})
    .catch((err) => console.log(err))
    .then((result) => {
       document.querySelector('#avatar').style.backgroundImage = `url(${result.avatar})`;
     }); 
};