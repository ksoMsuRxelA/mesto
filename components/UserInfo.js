import { profile, popupPersonInfoName, popupPersonInfoRole } from '../utils/constants.js';

export default class UserInfo {
  constructor({ nameSelector, roleSelector }) {
    this._nameSelector = nameSelector;
    this._roleSelector = roleSelector;
  }

  getUserInfo() {
    return {
      name: profile.querySelector(this._nameSelector).textContent,
      role: profile.querySelector(this._roleSelector).textContent
    }
  }

  setUserInfo(info) {
    popupPersonInfoName.value = info.name;
    popupPersonInfoRole.value = info.role;
  }
}