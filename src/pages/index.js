import './index.css';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import { 
  objSelectors, 
  popupCloseButtonEdit, 
  popupEditFormAdd, 
  popupEditFormPerson,
  popupOpenButtonEdit,
  profileFullName,
  profileRole,
  profileAvatarElement,
  nameSelector,
  roleSelector,
  editPopupSelector,
  popupPersonInfoName, 
  popupPersonInfoRole, 
  cardTemplateSelector,
  imagePopupSelector,
  addPopupSelector,
  popupOpenButtonAdd,
  popupCloseButtonAdd,
  initialCards,
  cardListSelector,
  popupAvatarForm,
  profileAvatar,
  profile
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'c1029b6e-f14f-48d8-a0b9-3627c8971067',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка запроса: ${res.status}`);
  })
  .then((data) => {
    profileFullName.textContent = data.name;
    profileRole.textContent = data.about;
    profileAvatarElement.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {
    console.log(`Ошибка запроса: ${err}`);
  });

// api.getInitialCards()
//   .then((res) => {
//     if(res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка запроса: ${res.status}`);
//   })
//   .then((data) => {

//   })

function createCard(item) { 
  const card = new Card(
    item,
    cardTemplateSelector,
    () => {
      popupWithImage.open(item.link, item.name, item.name);
    },
    (evt) => {
      evt.target.classList.toggle('element__like-button_active');
    },
    (evt) => {
      const delParent = evt.target.closest('.element');
      delParent.remove();
    }
  );

  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

//Начало реализация интерактивности изображений карточек

const popupWithImage = new PopupWithImage(imagePopupSelector);

popupWithImage.setEventListeners();

//Конец реализация интерактивности изображений карточек

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  roleSelector: roleSelector
});

//Начало реализация интерактивности формы редактирования личной информации пользователя
const editFormValidate = new FormValidator(objSelectors, popupEditFormPerson);

editFormValidate.enableValidation();

const infoForm = new PopupWithForm(
  (item) => {
    userInfo.setUserInfo(item);
    infoForm.close();
  },
  editPopupSelector,
  () => {
    editFormValidate.clearForm();
  }
);

infoForm.setEventListeners();

popupOpenButtonEdit.addEventListener('click', () => {
  const currentPersonInfo = userInfo.getUserInfo();
  popupPersonInfoName.value = currentPersonInfo.fullname;
  popupPersonInfoRole.value = currentPersonInfo.role;
  infoForm.open();
});

//Конец реализация интерактивности формы редактирования личной информации пользователя

//Начало реализации размещения начальных карточек на странице
export const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item);
  }
}, cardListSelector);

cardList.renderItems();
//Конец реализации размещения начальных карточек на странице

//Начало реализации интерактивности формы добавления карточки с фотографией
const addFormValidate = new FormValidator(objSelectors, popupEditFormAdd);

addFormValidate.enableValidation();

const addForm = new PopupWithForm(
  (item) => {
    createCard(item);
    addForm.close();
  },
  addPopupSelector,
  () => {
    addFormValidate.clearForm();
  }
);

addForm.setEventListeners();

popupOpenButtonAdd.addEventListener('click', () => {
  addForm.open();
});

//Конец реализации интерактивности формы добавления карточки с фотографией

//Начало кода девятого спринта//
const avatarFormValidate = new FormValidator(objSelectors, popupAvatarForm);

avatarFormValidate.enableValidation();



