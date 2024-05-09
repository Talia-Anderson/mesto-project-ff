
import {checkResponse} from './utils.js';

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    authorization: 'bbcf2270-d3d0-40fa-b649-4e22b6be7820',
    'Content-Type': 'application/json'
  }
};

//поставить лайк

export const setLike = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers,
    })
    .then(res => checkResponse(res))
    
};

//удалить лайк

export const delLike = (ID) => {
  return fetch(`${config.baseUrl}/cards/likes/${ID}`, {
    method: 'DELETE',
    headers: config.headers,
    })
    .then(res => checkResponse(res))
    
};

//удалить карточку

export const delCardFromServer = (ID) => {
  return fetch(`${config.baseUrl}/cards/${ID}`, {
    method: 'DELETE',
    headers: config.headers,
    });
};

//добавить карточки с сервера

export const addInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => checkResponse(res));
    
};

// забрать с сервера профиль

export const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => checkResponse(res));
   
};

// добавить новую карточку

export const addNewCard = (cardNameInput, linkInput) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: linkInput.value
    })
    })
    .then(res => checkResponse(res))
    
};

// добавить в профиль

export const addNewProfileInfo = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
    })
    .then(res => checkResponse(res))
};

// добавить аватар

export const addNewAvatar = (avatartURLInput) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
     body: JSON.stringify({
      avatar: avatartURLInput.value
    })
    })
    .then(res => checkResponse(res))
};