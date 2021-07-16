export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._element = document.querySelector(popupSelector);
  }

  open() {
    this._element.classList.add('popup_opened');
  }

  close() {
    this._element.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  setEventListeners() {
    this._element.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._element.addEventListener('mousedown', this._handleClickClose.bind(this));
  }

  _removeEventListeners() {
    this._element.querySelector('.popup__close-button').removeEventListener('click', this.close);
    document.removeEventListener('keydown', this._handleEscClose);
    this._element.removeEventListener('mousedown', this._handleClickClose);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if(evt.target.classList.contains('popup')) {
      this.close();
    }
  }
}