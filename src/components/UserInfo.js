export default class UserInfo {
  constructor({ nameSelector, roleSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._roleElement = document.querySelector(roleSelector);
  }

  getUserInfo() {
    return {
      fullname: this._nameElement.textContent,
      role: this._roleElement.textContent
    }
  }

  setUserInfo(info) {
    this._nameElement.textContent = info.fullname;
    this._roleElement.textContent = info.role;
  }
}