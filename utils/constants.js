export const page = document.querySelector('.page');
export const content = page.querySelector('.content');

export const elements = content.querySelector('.elements');
export const elementList = elements.querySelectorAll('.element');

export const popupEdit = page.querySelector('.popup_type_edit');
export const popupContainerPerson = popupEdit.querySelector('.popup__container');
export const popupEditFormPerson = popupContainerPerson.querySelector('.popup__edit-form');
export const popupCloseButtonEdit = popupEditFormPerson.querySelector('.popup__close-button');
export const popupPersonInfoName = popupEditFormPerson.querySelector('.popup__input-name');
export const popupPersonInfoRole = popupEditFormPerson.querySelector('.popup__input-role');


export const popupAdd = page.querySelector('.popup_type_new-card');
export const popupContainerAdd = popupAdd.querySelector('.popup__container');
export const popupEditFormAdd = popupAdd.querySelector('.popup__edit-form');
export const popupCloseButtonAdd = popupAdd.querySelector('.popup__close-button');
export const popupInfoInputName = popupAdd.querySelector('.popup__input-name');
export const popupInfoInputLink = popupAdd.querySelector('.popup__input-link');

export const popupImage = page.querySelector('.popup_type_image');
export const popupImageContainer = popupImage.querySelector('.popup__container');
export const popupImg = popupImage.querySelector('.popup__image');
export const popupCaption = popupImage.querySelector('.popup__image-caption');
export const popupCloseButtonImage = popupImage.querySelector('.popup__close-button');

export const profile = content.querySelector('.profile');
export const popupOpenButtonEdit = profile.querySelector('.profile__edit-button');
export const popupOpenButtonAdd = profile.querySelector('.profile__add-button');
export const profileFullName = profile.querySelector('.profile__full-name'); //h1 tag
export const profileRole = profile.querySelector('.profile__role'); //p tag