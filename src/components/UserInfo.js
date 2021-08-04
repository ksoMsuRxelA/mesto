export default class UserInfo {
  constructor({ nameSelector, roleSelector, avatarSelector, userId }) {
    this._nameElement = document.querySelector(nameSelector);
    this._roleElement = document.querySelector(roleSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = userId;
    //
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
    this._avatarElement.style.backgroundImage = `url(${info.avatar})`;
    this._userId = info._id;
  }
}