import { element } from './base';

export const getInput = () => element.searchInput.value;

export const clearInput = () => {
  element.searchInput.value = '';
}

// clear results from previous search
export const clearResult = () => {
 element.resultList.innerHTML = '';
 element.resultPerPage.innerHTML = '';
};


export const highlightRecipe = id => {

  // remove any previous highlighted recipe
  const links = [...document.querySelectorAll('.results__link')];
  links.forEach(link => link.classList.remove('results__link--active'));

  // highlight recipe
  document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

export const shortenTitle  = (title, limit = 16) => {
   const length = title.length;
   if (length > limit){
     title = title.slice(0,limit);
     title = title.padEnd((title.length + 3), '...');
     return title;
   }
   return title;
}

export const renderRecipe = recipe => {
  const html =  `
   <li>
      <a class="results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
         <img src="${recipe.image_url}">
      </figure>
     <div class="results__data">
         <h4 class="results__name">${shortenTitle(recipe.title)}</h4>
         <p class="results__author">${recipe.publisher}</p>
     </div>
     </a>
  </li> 
  `;
  return html;
}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? (page - 1) : (page + 1)}>
    <span>Page ${type === 'prev' ? (page - 1) : (page + 1)}</span>
      <svg class="search__icon">
         <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
     </svg>
   </button>
`;

const renderButton = (page, numOfResult, resultPerPage) => {
  const pages = Math.ceil(numOfResult/resultPerPage);
  let button;
  if (page === 1 && pages > 1){
    // show 'next' button
    button = createButton(page,'next');
  }
  else if (page < pages){
    // show 'prev' & 'next'
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  }
  else if (page === pages & pages > 1 ){
     // show 'prev'
     button = createButton(page, 'prev');
  }
  element.resultPerPage.insertAdjacentHTML('afterbegin', button);
}

// on page 1 -> 10 resultsPerPage -> slice(0, 10) 
// on page 2 ->  // -> slice(10, 20)
// on page 3 -> // -> slice(20, 30)
export const renderRecipes = (recipes, page = 1, resultPerPage = 10) => {
  const start = (page - 1) * resultPerPage;
  const end = page * resultPerPage; 

  const markUp = recipes.slice(start, end).map(renderRecipe).join(' ');
  element.resultList.insertAdjacentHTML('afterbegin', markUp); 
  renderButton(page, recipes.length, resultPerPage);
}