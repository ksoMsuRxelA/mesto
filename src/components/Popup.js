export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._element = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._element.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    this._element.addEventListener('mousedown', this._handleClickClose.bind(this));
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