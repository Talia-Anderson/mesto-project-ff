
function handleClickEsc(evt) {
  if(evt.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closePopup(modal);
  }
}

function closePopup(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleClickEsc);
}

function openPopup(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleClickEsc);
}

export {closePopup, openPopup}