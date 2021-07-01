import FormValidator from './FormValidator.js';

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

const EditFormValidate = new FormValidator(objSelectors, popupEditFormPerson);
const AddFormValidate = new FormValidator(objSelectors, popupEditFormAdd);
// debugger;
EditFormValidate.enableValidation();
AddFormValidate.enableValidation();

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
  popup.addEventListener('click', closeByClickOnOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('click', closeByClickOnOverlay);
}

//кажется теперь я Вас правильно понял//

function openEditPopup() {
  openPopup(popupEdit);
  takeInputsFromPage();
}

function closeEditPopup() {
  closePopup(popupEdit);
  EditFormValidate.clearForm();
}

function openAddPopup() {
  openPopup(popupAdd);
}

function closeAddPopup() {
  closePopup(popupAdd);
  AddFormValidate.clearForm();
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
  closePopup(popupEdit)(); //просто напросто забыл про этот момент, извините :)
}

popupEditFormPerson.addEventListener('submit', formSubmitHandlerEdit);

//Здесь начинается код нового спринта. 

/*Шесть карточек из коробки*/

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

const cardTemp = page.querySelector('#cardTemplate');
const cardTempContent = cardTemp.content;

function createCard(title, link) {
  const newCard = cardTempContent.cloneNode(true);

  newCard.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active');
  });
  newCard.querySelector('.element__delete-button').addEventListener('click', function(event) {
    const delParent = event.target.closest('.element');
    delParent.remove();
  });
  newCard.querySelector('.element__image').addEventListener('click', function(event) {
    popupCaption.textContent = event.target.nextElementSibling.textContent;
    popupImg.src = event.target.src;
    popupImg.alt = event.target.nextElementSibling.textContent;
    openImagePopup();
  });

  const newCardImg = newCard.querySelector('.element__image');
  newCard.querySelector('.element__title').textContent = title;
  newCardImg.src = link;
  newCardImg.alt = title;
  
  return newCard;
}

function addCard(container, cardItem) {
  container.prepend(cardItem);
}

initialCards.forEach(item => {
  addCard(elements, createCard(item.name, item.link));
});

function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  addCard(elements, createCard(popupInfoInputName.value, popupInfoInputLink.value));
  popupEditFormAdd.reset();
  closeAddPopup();
}

popupEditFormAdd.addEventListener('submit', formSubmitHandlerAdd);