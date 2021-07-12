import { popupEdit, profile } from '../utils/constants.js';

class UserInfo {
  constructor({ nameSelector, roleSelector }) {
    this._nameSelector = nameSelector;
    this._roleSelector = roleSelector;
  }

  getUserInfo() {
    return {
      name: popupEdit.querySelector(this._nameSelector).value,
      role: popupEdit.querySelector(this._roleSelector).value
    }
  }

  setUserInfo() {
    profile.querySelector('.profile__full-name').textContent = popupEdit.querySelector(this._nameSelector).value;
    profile.querySelector('.profile__role').textContent = popupEdit.querySelector(this._roleSelector).value;
  }
}