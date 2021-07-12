class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._data = data;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick; //##
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
    this._img.src = this._data['link'];
    this._img.alt = this._data['name'];
    this._card.querySelector('.element__title').textContent = this._data['name'];
    this._setEventListeners();
  }

  _setEventListeners = () => {
    this._card.querySelector('.element__like-button').addEventListener('click', this._onLike);
    this._card.querySelector('.element__delete-button').addEventListener('click', this._onDelete);
    this._card.querySelector('.element__image').addEventListener('click', this._handleCardClick); //##
  }

  _onLike = (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  }

  _onDelete = (evt) => {
    const delParent = evt.target.closest('.element');
    delParent.remove();
  }

  // _onImg = (evt) => {
  //   const popupImg = document.querySelector('.popup_type_image');
  //   popupImg.querySelector('.popup__image-caption').textContent = evt.target.nextElementSibling.textContent;
  //   const imgElement = popupImg.querySelector('.popup__image');
  //   imgElement.src = evt.target.src;
  //   imgElement.alt = evt.target.nextElementSibling.textContent;
  //   openImagePopup(); //данная функция нужна для открытия попапа изображения. Можно было бы реализовать отдельный приватный метод для этого, но ввиду каскадной структуры данной функции (она вызвает OpenPopup, которая вешает слушателей с обработчиками closeByEscape & closeByClickOnOverlay и т.д.), данная идея не выглядит целесообразной. Гораздо проще и понятнее импортировать ее и основного файла с кодом. 
  // }
}

export default Card;


