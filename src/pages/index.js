import './index.css';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
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
  avatarSelector,
  editPopupSelector,
  popupPersonInfoName, 
  popupPersonInfoRole, 
  cardTemplateSelector,
  cardTemplateSelectorUser,
  imagePopupSelector,
  addPopupSelector,
  popupOpenButtonAdd,
  popupCloseButtonAdd,
  initialCards,
  cardListSelector,
  popupAvatarForm,
  profile,
  deletePopupSelector,
  avatarPopupSelector
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'c1029b6e-f14f-48d8-a0b9-3627c8971067',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  roleSelector: roleSelector,
  avatarSelector: avatarSelector,
  userId: null
});

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    return Promise.resolve(data._id);
  })
  .then((userId) => {
    function getCurrentCardList() {
      api.getInitialCards()
        .then((cardsData) => {
          cardsData.forEach((currentCard) => { //здесь я решил не менять логику метода renderItems, а просто пройтись по массиву и добавить с помощью единственного (теперь уже) объекта класса Section, который задан внутри createCard.
            createCard(currentCard);
          })
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
    
    getCurrentCardList();
      //Объект класса PopupWithSubmit для удаления карточки
    const deleteForm = new PopupWithSubmit(
      () => {},
      deletePopupSelector
    );
    
    deleteForm.setEventListeners();
    
    function createCard(item) { //##
      item.isOwner = item.owner._id === userId;
      const card = new Card(
        item, //data of a card
        item.isOwner ? cardTemplateSelector : cardTemplateSelectorUser, //template selector of a card
        () => { //handle function to set a popup to any card
          popupWithImage.open(item.link, item.name, item.name);
        },
        () => { //handle function to like icon any card
          if(!card.likeStatus()) {
            api.putLike(item._id)
              .then((likeResponse) => {
                card.setLikeCounter(likeResponse.likes);
                card.setLike();
              })
              .catch((err) => {
                console.log(`Ошибка запроса при попытке поставить лайк: ${err}`);
              })
          } else {
            api.deleteLike(item._id)
              .then((unlikeResponse) => {
                card.setLikeCounter(unlikeResponse.likes);
                card.setLike();
              })
              .catch((err) => {
                console.log(`Ошибка запрос при попытке снять лайк: ${err}`);
              })
          }
        },
        (evt) => { //handle function to delete icon an own card
          deleteForm.open();
          deleteForm.setHandleFormSubmit(() => {
            api.deleteOwnerCard(item._id)
              .then((res) => {
                if(res.ok) {
                  const delParent = evt.target.closest('.element');
                  delParent.remove();
                  deleteForm.close();
                }
              })
              .catch((err) => {
                console.log(`Ошибка: ${err}`);
              });
          });
        },
        userId
      );
    
      const cardElement = card.generateCard();
      cardList.addItem(cardElement); //вот тот самый единственный объект класса Section
    }
    
    //Начало реализация интерактивности изображений карточек
    
    const popupWithImage = new PopupWithImage(imagePopupSelector);
    
    popupWithImage.setEventListeners();
    
    //Конец реализация интерактивности изображений карточек
    
    //Начало реализация интерактивности формы редактирования личной информации пользователя
    const editFormValidate = new FormValidator(objSelectors, popupEditFormPerson);
    
    editFormValidate.enableValidation();
    
    const infoForm = new PopupWithForm(
      (item) => { //##
        api.patchUserInfo(item)
          .then((newUserInfo) => {
            userInfo.setUserInfo(newUserInfo);
            infoForm.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      },
      editPopupSelector,
      () => {
        editFormValidate.clearForm();
      }
    );
    
    infoForm.setEventListeners();
    
    popupOpenButtonEdit.addEventListener('click', () => {
      const currentPersonInfo = userInfo.getUserInfo();
      popupPersonInfoName.value = currentPersonInfo.name;
      popupPersonInfoRole.value = currentPersonInfo.about;
      infoForm.open();
    });
    
    //Конец реализация интерактивности формы редактирования личной информации пользователя
    
    //Начало реализации размещения новых карточек на странице
    const cardList = new Section({
      items: [],
      renderer: (item) => {
        createCard(item);
      }
    }, cardListSelector);
    //Конец реализации размещения новых карточек на странице
    
    //Начало реализации интерактивности формы добавления карточки с фотографией
    const addFormValidate = new FormValidator(objSelectors, popupEditFormAdd);
    
    addFormValidate.enableValidation();
    
    const addForm = new PopupWithForm(
      (item) => {
        api.postNewCard(item)
          .then((newCardData) => {
            createCard(newCardData);
            addForm.close();
          })
          .catch((err) => {
            console.log(`Ошибка при запросе на создание новой карточки: ${err}`);
          })
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
    
    const avatarForm = new PopupWithForm(
      (item) => {
        api.patchAvatar(item)
          .then((newUserAvatar) => {
            userInfo.setUserInfo(newUserAvatar);
            avatarForm.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      },
      avatarPopupSelector,
      () => {
        avatarFormValidate.clearForm();
      }
    );
    
    avatarForm.setEventListeners();
    
    profileAvatarElement.addEventListener('click', () => {
      avatarForm.open();
    })
  })
  .catch((err) => {
    profile.style.visibility = 'hidden';
    console.log(`Ошибка при попытке получения данных о пользователе: ${err}`);
  });