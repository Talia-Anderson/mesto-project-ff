
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

export {initialCards}