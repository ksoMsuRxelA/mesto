import Popup from './Popup.js';
import { popupImg, popupCaption } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor({ srcImg, altImg, captionText }, popupSelector) {
    super(popupSelector);
    this._srcImg = srcImg;
    this._altImg = altImg;
    this._captionText = captionText;
  }

  open() {
    popupImg.src = this._srcImg;
    popupImg.alt = this._altImg;
    popupCaption.textContent = this._captionText;
    super.open();
  }
}