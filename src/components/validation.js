

const isValid = (formElement, inputElement, settings) => {

  if (inputElement.validity.patternMismatch) {
    const error = inputElement.dataset.errorMessage;
    inputElement.setCustomValidity(error);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(`${settings.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${settings.errorClass}`);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

export const enableValidation = (settings) =>
{ console.log(settings);
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((fieldSet) => {
      fieldSet.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(fieldSet, settings);
    });

};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  } 
};

export const clearValidation = (formElement, settings) => {
  console.log(settings); 
  const button = Array.from(formElement.querySelectorAll(settings.submitButtonSelector));
  button.forEach(elem => {
    elem.classList.add(settings.inactiveButtonClass);
  });

  const errors = Array.from(formElement.querySelectorAll('span'))
  errors.forEach(error => {
    error.classList.remove(settings.errorClass);
    error.textContent = '';
  })

  const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputs.forEach(elem => {
    console.log(elem);
    elem.classList.remove(settings.inputErrorClass);
    elem.value = '';
  })
}