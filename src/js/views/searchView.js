import { element } from './base';

export const getInput = () => element.searchInput.value;

export const clearInput = () => {
  element.searchInput.value = '';
}

// clear results from previous search
export const clearRecipesList = () => {
 element.resultList.innerHTML = '';
};

export const renderRecipe = recipe => {
  const html =  `
   <li>
      <a class="results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
         <img src="${recipe.image_url}">
      </figure>
     <div class="results__data">
         <h4 class="results__name">${recipe.title}</h4>
         <p class="results__author">${recipe.publisher}</p>
     </div>
     </a>
  </li> 
  `;
  return html;
}

export const renderRecipes = recipes => {
  const markUp = recipes.map(renderRecipe).join(' ');
  element.resultList.insertAdjacentHTML('afterbegin', markUp);
}