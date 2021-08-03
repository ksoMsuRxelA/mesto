export default class UserInfo {
  constructor({ nameSelector, roleSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._roleElement = document.querySelector(roleSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._roleElement.textContent
    }
  }

  setUserInfo(info) {
    this._nameElement.textContent = info.name;
    this._roleElement.textContent = info.about;
  }
}