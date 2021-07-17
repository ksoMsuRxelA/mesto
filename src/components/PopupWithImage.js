import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._element.querySelector('.popup__image');
    this._popupCaption = this._element.querySelector('.popup__image-caption');
  }

  open(src, alt, captionText) {
    this._popupImg.src = src;
    this._popupImg.alt = alt;
    this._popupCaption.textContent = captionText;
    super.open();
  }
}