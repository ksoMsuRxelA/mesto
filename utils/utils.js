import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { cardList } from '../pages/index.js';

import {
  cardTemplateSelector,
  imagePopupSelector
} from './constants.js';

export function createCard(item) {
  const card = new Card(
    item,
    cardTemplateSelector,
    () => {
      const popupWithImage = new PopupWithImage(
        {
          srcImg: item.link,
          altImg: item.name,
          captionText: item.name
        },
        imagePopupSelector
      );
      popupWithImage.setEventListeners();
      popupWithImage.open();
    }
  );

  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}