export const element = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchButton: document.querySelector('.search__btn'),
  resultList: document.querySelector('.results__list'),
  wrapperList: document.querySelector('.results'),
  resultPerPage: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list'),
};

export const showLoader = (parent) => {
  const loader = `
      <div class="loader">
          <svg>
               <use href="img/icons.svg#icon-cw"></use>
          </svg>
      </div> 
   `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const removeLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
};
