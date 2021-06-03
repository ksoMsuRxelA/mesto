const page = document.querySelector('.page');
const content = page.querySelector('.content');

const elements = content.querySelector('.elements');
const elementList = elements.querySelectorAll('.element');

const popupEdit = page.querySelector('.popup_type_edit');
const popupContainerPerson = popupEdit.querySelector('.popup__container');
const popupEditFormPerson = popupContainerPerson.querySelector('.popup__edit-form');
const popupCloseButtonEdit = popupEditFormPerson.querySelector('.popup__close-button');
const popupPersonInfoInputs = popupEditFormPerson.querySelectorAll('.popup__input');

const popupAdd = page.querySelector('.popup_type_new-card');
const popupEditFormAdd = popupAdd.querySelector('.popup__edit-form');
const popupCloseButtonAdd = popupAdd.querySelector('.popup__close-button');
const popupInfoInputsAdd = popupAdd.querySelectorAll('.popup__input');

const popupImage = page.querySelector('.popup_type_image');
const popupImg = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__image-caption');
const popupCloseButtonImage = popupImage.querySelector('.popup__close-button');

const profile = content.querySelector('.profile');
const popupOpenButtonEdit = profile.querySelector('.profile__edit-button');
const popupOpenButtonAdd = profile.querySelector('.profile__add-button');
const profileFullName = profile.querySelector('.profile__full-name'); //h1 tag
const profileRole = profile.querySelector('.profile__role'); //p tag

function takeInputsFromPage() {
  popupPersonInfoInputs[0].value = profileFullName.textContent;
  popupPersonInfoInputs[1].value = profileRole.textContent;
}

function popupToggle(popup) {
  return function() {
    if(popup === popupEdit) {
      takeInputsFromPage();
    }
    popup.classList.toggle('popup_opened');
  }
}

popupOpenButtonEdit.addEventListener('click', popupToggle(popupEdit));
popupCloseButtonEdit.addEventListener('click', popupToggle(popupEdit));

popupOpenButtonAdd.addEventListener('click', popupToggle(popupAdd));
popupCloseButtonAdd.addEventListener('click', popupToggle(popupAdd));

popupCloseButtonImage.addEventListener('click', popupToggle(popupImage));

function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  profileFullName.textContent = popupPersonInfoInputs[0].value;
  profileRole.textContent = popupPersonInfoInputs[1].value;
  popupEdit.classList.remove('popup_opened');
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

function makeCard(title, link) {
  const cardTemp = page.querySelector('#cardTemplate');
  const cardTempContent = cardTemp.content;
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
    popupImage.classList.add('popup_opened');
  });
  newCard.querySelector('.element__title').textContent = title;
  newCard.querySelector('.element__image').src = link;
  newCard.querySelector('.element__image').alt = title;
  elements.prepend(newCard);
}

initialCards.forEach(item => {
  makeCard(item.name, item.link);
});

function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  makeCard(popupInfoInputsAdd[0].value, popupInfoInputsAdd[1].value);
  popupInfoInputsAdd.forEach(item => {item.value = ''}); //опустошаем поля ввода, чтобы пользователю не приходилось делать это самому
  popupAdd.classList.remove('popup_opened');
}

popupEditFormAdd.addEventListener('submit', formSubmitHandlerAdd);
