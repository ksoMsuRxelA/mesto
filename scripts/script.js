import FormValidator from './FormValidator.js';
import Card from './Card.js';

const page = document.querySelector('.page');
const content = page.querySelector('.content');

const elements = content.querySelector('.elements');
const elementList = elements.querySelectorAll('.element');

const popupEdit = page.querySelector('.popup_type_edit');
const popupContainerPerson = popupEdit.querySelector('.popup__container');
const popupEditFormPerson = popupContainerPerson.querySelector('.popup__edit-form');
const popupCloseButtonEdit = popupEditFormPerson.querySelector('.popup__close-button');
const popupPersonInfoName = popupEditFormPerson.querySelector('.popup__input-name');
const popupPersonInfoRole = popupEditFormPerson.querySelector('.popup__input-role');


const popupAdd = page.querySelector('.popup_type_new-card');
const popupContainerAdd = popupAdd.querySelector('.popup__container');
const popupEditFormAdd = popupAdd.querySelector('.popup__edit-form');
const popupCloseButtonAdd = popupAdd.querySelector('.popup__close-button');
const popupInfoInputName = popupAdd.querySelector('.popup__input-name');
const popupInfoInputLink = popupAdd.querySelector('.popup__input-link');

const popupImage = page.querySelector('.popup_type_image');
const popupImageContainer = popupImage.querySelector('.popup__container');
const popupImg = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__image-caption');
const popupCloseButtonImage = popupImage.querySelector('.popup__close-button');

const profile = content.querySelector('.profile');
const popupOpenButtonEdit = profile.querySelector('.profile__edit-button');
const popupOpenButtonAdd = profile.querySelector('.profile__add-button');
const profileFullName = profile.querySelector('.profile__full-name'); //h1 tag
const profileRole = profile.querySelector('.profile__role'); //p tag

const objSelectors = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-element_visible'
};

const editFormValidate = new FormValidator(objSelectors, popupEditFormPerson);
const addFormValidate = new FormValidator(objSelectors, popupEditFormAdd);
editFormValidate.enableValidation();
addFormValidate.enableValidation();

function takeInputsFromPage() {
  popupPersonInfoName.value = profileFullName.textContent;
  popupPersonInfoRole.value = profileRole.textContent;
}

function closeActivePopup(activePopup) {
  if(activePopup.classList.contains('popup_type_edit')) {
    closeEditPopup();
  } else if(activePopup.classList.contains('popup_type_new-card')) {
    closeAddPopup();
  } else {
    closeImagePopup();
  }
}

function closeByEscape(evt) {
  if(evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closeActivePopup(activePopup);
  }
}

function closeByClickOnOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    const activePopup = document.querySelector('.popup_opened');
    closeActivePopup(activePopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('mousedown', closeByClickOnOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('mousedown', closeByClickOnOverlay);
}

function openEditPopup() {
  openPopup(popupEdit);
  takeInputsFromPage();
}

function closeEditPopup() {
  closePopup(popupEdit);
  editFormValidate.clearForm();
}

function openAddPopup() {
  openPopup(popupAdd);
}

function closeAddPopup() {
  closePopup(popupAdd);
  addFormValidate.clearForm();
  popupEditFormAdd.reset();
}

function openImagePopup() {
  openPopup(popupImage);
}

function closeImagePopup() {
  closePopup(popupImage);
}

popupOpenButtonEdit.addEventListener('click', openEditPopup);
popupCloseButtonEdit.addEventListener('click', closeEditPopup);

popupOpenButtonAdd.addEventListener('click', openAddPopup);
popupCloseButtonAdd.addEventListener('click', closeAddPopup);

popupCloseButtonImage.addEventListener('click', closeImagePopup);

function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  profileFullName.textContent = popupPersonInfoName.value;
  profileRole.textContent = popupPersonInfoRole.value;
  closePopup(popupEdit);
}

popupEditFormPerson.addEventListener('submit', formSubmitHandlerEdit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addCard(container, cardItem) {
  container.prepend(cardItem);
}

initialCards.forEach(item => {
  const newCard = new Card(item, '#cardTemplate');
  const newCardElement = newCard.generateCard();
  addCard(elements, newCardElement);
});

function formSubmitHandlerAdd (evt) {
  evt.preventDefault(); 
  const item = {name: popupInfoInputName.value, link: popupInfoInputLink.value};
  const newCard = new Card(item, '#cardTemplate');
  const newCardElement = newCard.generateCard();
  addCard(elements, newCardElement);
  popupEditFormAdd.reset();
  closeAddPopup();
}

popupEditFormAdd.addEventListener('submit', formSubmitHandlerAdd);

export default openImagePopup;