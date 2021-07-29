class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleLikeClick, handleDeleteIconClick) {
    this._data = data;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick; 
    this._handleLikeClick = handleLikeClick; 
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  generateCard = () => {
    if(!this._card) {
      this._createCard();
    }
    return this._card;
  }

  _createCard = () => {
    this._card = document.querySelector(this._cardTemplateSelector).content.cloneNode(true).children[0];
    this._img = this._card.querySelector('.element__image');
    this._img.src = this._data.link;
    this._img.alt = this._data.name;
    this._card.querySelector('.element__title').textContent = this._data['name'];
    this._setEventListeners();
  }

  _setEventListeners = () => {
    this._card.querySelector('.element__like-button').addEventListener('click', this._handleLikeClick);
    this._card.querySelector('.element__delete-button').addEventListener('click', this._handleDeleteIconClick);
    this._card.querySelector('.element__image').addEventListener('click', this._handleCardClick); //##
  }
}

export default Card;


