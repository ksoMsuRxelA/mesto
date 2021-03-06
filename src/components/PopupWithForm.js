import Popup from './Popup.js';
// import FormValidator from './FormValidator.js';
import { profileFullName, profileRole } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector, handleFormClose) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormClose = handleFormClose;
    this._formElement = this._element.querySelector('.popup__edit-form');
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input');

    this._formValues = {};
    
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formElement.querySelector('.popup__save-button').textContent = "Сохранить...";
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._handleFormClose();
    this._formElement.querySelector('.popup__save-button').textContent = "Сохранить";
    this._formElement.reset();
  }
}