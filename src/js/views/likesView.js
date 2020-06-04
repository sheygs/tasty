import { element } from './base';

export const toggleLikeButton = isLiked => {
   // '' - white color
   // '-outlined' - no color
   const iconString = isLiked ?  '' : '-outlined';
   document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#icon-heart${iconString}`);
}

export const toggleLikeButtonMenu = numLikes => {
  element.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
   const markUp = `
   <li>
    <a class="likes__link" href="#${like.id}">
      <figure class="likes__fig">
        <img src="${like.img}" alt="${like.title}" />
      </figure>
      <div class="likes__data">
        <h4 class="likes__name">${like.title}.</h4>
        <p class="likes__author">${like.author}</p>
      </div>
    </a>
 </li>  
   `;
   element.likesList.insertAdjacentHTML('beforeend', markUp);
};


export const deleteLike = id => {
 const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
 if (el){
    el.remove();
 }
}