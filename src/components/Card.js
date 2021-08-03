class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleLikeClick, handleDeleteIconClick, userId) {
    this._data = data;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick; 
    this._handleLikeClick = handleLikeClick; 
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._userId = userId;
    this._isLiked = false;
  }

  generateCard = () => {
    if(!this._card) {
      this._createCard();
    }
    return this._card;
  }

  likeStatus() {
    return this._isLiked;
  }

  setLike() {
    if(this._data.likes.some((userThatLikedCard) => {
      return userThatLikedCard._id === this._userId;
    })) {
      this._isLiked = true;
      this._card.querySelector('.element__like-button').classList.add('element__like-button_active');
    } else {
      this._isLiked = false;
      this._card.querySelector('.element__like-button').classList.remove('element__like-button_active');
    }
  }

  setLikeCounter(likedUserArray) {
    this._likeCounter.textContent = likedUserArray.length;
    this._data.likes = likedUserArray;
  }

  _createCard = () => {
    this._card = document.querySelector(this._cardTemplateSelector).content.cloneNode(true).children[0];
    this._img = this._card.querySelector('.element__image');
    this._likeCounter = this._card.querySelector('.element__like-counter');
    this._img.src = this._data.link;
    this._img.alt = this._data.name;
    this._card.querySelector('.element__title').textContent = this._data['name'];
    this._likeCounter.textContent = this._data.likes.length;
    this._setEventListeners();
    this.setLike();
  }

  _setEventListeners = () => {
    this._card.querySelector('.element__like-button').addEventListener('click', this._handleLikeClick);
    if(this._data.isOwner) {
      this._card.querySelector('.element__delete-button').addEventListener('click', this._handleDeleteIconClick);
    }
    this._card.querySelector('.element__image').addEventListener('click', this._handleCardClick); 
  }
}

export default Card;


