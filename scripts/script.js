let page = document.querySelector('.page');
let content = page.querySelector('.content');
let elements = content.querySelector('.elements');
let elementList = elements.querySelectorAll('.element');

let popup = page.querySelectorAll('.popup');
let popupContainerPerson = popup[0].querySelector('.popup__container');
let popupEditFormPerson = popupContainerPerson.querySelector('.popup__edit-form');
let popupCloseButtonPerson = popupEditFormPerson.querySelector('.popup__close-button');

let profile = content.querySelector('.profile');
let popupOpenButtonPerson = profile.querySelector('.profile__edit-button');
let profileFullName = profile.querySelector('.profile__full-name'); //h1 tag
let profileRole = profile.querySelector('.profile__role'); //p tag
let popupPersonInfoInputs = popupEditFormPerson.querySelectorAll('.popup__input');

function takeInputsFromPage() {
  popupPersonInfoInputs[0].value = profileFullName.textContent;
  popupPersonInfoInputs[1].value = profileRole.textContent;
}

function popupOpenClass(popupIndex) {
  return function() {
    popup[popupIndex].classList.add('popup_opened');
  }
}

function popupCloseClass(popupIndex) {
  return function() {
    popup[popupIndex].classList.remove('popup_opened');
  }
}

popupOpenButtonPerson.addEventListener('click', popupOpenClass(0));
popupCloseButtonPerson.addEventListener('click', popupCloseClass(0));

const popupOpenButtonAdd = profile.querySelector('.profile__add-button');
const popupCloseButtonAdd = popup[1].querySelector('.popup__close-button');

popupOpenButtonAdd.addEventListener('click', popupOpenClass(1));
popupCloseButtonAdd.addEventListener('click', popupCloseClass(1));

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileFullName.textContent = popupPersonInfoInputs[0].value;
  profileRole.textContent = popupPersonInfoInputs[1].value;
  popup.classList.remove('popup_opened');
}

popupEditFormPerson.addEventListener('submit', formSubmitHandler);


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

/*Попробуем воспльзоваться новыми знаниями, а именно методом .children
и методом .from глобального объекта Array*/

Array.from(elements.children).forEach((item, index) => {
  const card = initialCards[index];
  item.querySelector('.element__image').src = card.link;
  item.querySelector('.element__title').textContent = card.name;
});


