import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

import { 
  objSelectors, 
  popupCloseButtonEdit, 
  popupEditFormAdd, 
  popupEditFormPerson,
  popupOpenButtonEdit,
  profileFullName,
  profileRole,
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
  cardListSelector
} from '../utils/constants.js';

import {
  createCard
} from '../utils/utils.js';

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

popupCloseButtonEdit.addEventListener('click', () => {
  infoForm.close();
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

popupCloseButtonAdd.addEventListener('click', () => {
  addForm.close();
});
//Конец реализации интерактивности формы добавления карточки с фотографией
