import { profile } from '../utils/constants.js';

export default class UserInfo {
  constructor({ nameSelector, roleSelector }) {
    this._nameSelector = nameSelector;
    this._roleSelector = roleSelector;
  }

  getUserInfo() {
    return {
      fullname: profile.querySelector(this._nameSelector).textContent,
      role: profile.querySelector(this._roleSelector).textContent
    }
  }

  setUserInfo(info) {
    profile.querySelector(this._nameSelector).textContent = info.fullname;
    profile.querySelector(this._roleSelector).textContent = info.role;
  }
}