let page = document.querySelector('.page');
let content = page.querySelector('.content');
let elements = content.querySelector('.elements');
let elementList = elements.querySelectorAll('.element');
let popup = page.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupEditForm = popupContainer.querySelector('.popup__edit-form');
let popupCloseButton = popupEditForm.querySelector('.popup__close-button');
let profile = content.querySelector('.profile');
let popupOpenButton = profile.querySelector('.profile__edit-button');
let profileFullName = profile.querySelector('.profile__full-name'); //h1 tag
let profileRole = profile.querySelector('.profile__role'); //p tag
let popupPersonInfoInputs = popupEditForm.querySelectorAll('.popup__input');

function takeInputsFromPage() {
  popupPersonInfoInputs[0].value = profileFullName.textContent;
  popupPersonInfoInputs[1].value = profileRole.textContent;
}

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})

popupOpenButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  takeInputsFromPage();
})

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileFullName.textContent = popupPersonInfoInputs[0].value;
  profileRole.textContent = popupPersonInfoInputs[1].value;
  popup.classList.remove('popup_opened');
}

popupEditForm.addEventListener('submit', formSubmitHandler);


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

