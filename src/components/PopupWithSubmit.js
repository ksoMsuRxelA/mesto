import Popup from '../components/Popup';

export default class PopupWithSubmit extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._element.querySelector('.popup__edit-form');
  }

  setHandleFormSubmit(tmpHandleFormSubmit) {
    this._handleFormSubmit = tmpHandleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formElement.querySelector('.popup__save-button').textContent = "Да...";
      this._handleFormSubmit();
    });
  }

  close() {
    super.close();
    this._formElement.querySelector('.popup__save-button').textContent = "Да";
  }
}