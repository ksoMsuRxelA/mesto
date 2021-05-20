let page = document.querySelector('.page');
let content = page.querySelector('.content');
let elements = content.querySelector('.elements');
let elementList = elements.querySelectorAll('.element');

for(let i = 0; i < elementList.length; i += 1) {
  let likeButton = elementList[i].querySelector('.element__like-button');
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__like-button_active');
  })
}

//Здесь я реализовал кнопку Like.//