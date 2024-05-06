
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820',
    'Content-Type': 'application/json'
  }
};

export const setLike = (ID, addLike, card) => {
  fetch(`${config.baseUrl}/cards/likes/${ID}`, {
    method: 'PUT',
    headers: config.headers,
    })
    .then(res => {if(res.ok) {return res.json()} else {return Promise.reject(`Ошибка ${res.status}`);}})
    .catch((err) => console.log(err))
    .then (res => {
      addLike.classList.add('card__like-button_is-active');
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
      addLike.classList.remove('card__like-button_is-active');
      card.textContent = res.likes.length;
    });
};

export const delCardFromServer = (ID) => {
  fetch(`${config.baseUrl}/cards/${ID}`, {
    method: 'DELETE',
    headers: config.headers,
    });
};

