import Popup from './Popup.js';
import { profileFullName, profileRole } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
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
      this._handleFormSubmit(this._getInputValues());
      this._formElement.reset();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}