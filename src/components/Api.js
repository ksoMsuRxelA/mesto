class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка запроса: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'GET',
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  patchUserInfo(newProfileInfo) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify(newProfileInfo)
    })
      .then(this._checkResponse);
  }

  postNewCard(newCardData) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(newCardData)
    })
      .then(this._checkResponse);
  }

  deleteOwnerCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    }); 
  }

  patchAvatar(avatarObject) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify(avatarObject)
    })
      .then(this._checkResponse);
  }

  putLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }
}

export default Api;