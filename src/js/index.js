import Search from './models/Search';
import Recipe from './models/Recipe';
import { element, showLoader, removeLoader } from './views/base';
import * as searchView from './views/searchView';

/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping List
 * - Liked recipes
 */
const state = {};

/**
 * 
 * @param {SEARCH CONTROLLER} e 
 */
const searchController = async (e) => {

  e.preventDefault();

  // input field value
  const query = searchView.getInput();

  // only proceed if there is a value
  if (query) {

    // search object
    state.search = new Search(query);

    // disable button to prevent double
    // form submission
    element.searchButton.disabled = true;

    // prepare UI for changes
    searchView.clearInput();
    searchView.clearResult();
    showLoader(element.wrapperList);

    try {

      // search for recipes 
      await state.search.getRecipe();
      element.searchButton.disabled = false;


      // display result on UI 
      removeLoader();
      searchView.renderRecipes(state.search.result);
    }

    catch ({ message }) {
      console.info('Something wrong with Search...');
    }
  }
}

element.searchForm.addEventListener('submit', searchController);

/**
 * 
 * @param {HANDLE BUTTON CLICK} e 
 */
function handleClick(e) {
  const button = e.target.closest('.btn-inline');
  const nextPage = Number(button.dataset.goto);
  searchView.clearResult();
  searchView.renderRecipes(state.search.result, nextPage);
}

element.resultPerPage.addEventListener('click', handleClick);


/**
 * 
 * @param {RECIPE CONTROLLER} e
 */

const recipeController = async () => {

   // get ID from URL
   const id = window.location.hash.slice(1);
   console.log(id);
   
   if (id) {
     // prepare UI for changes

     // create the recipe object
     state.recipe = new Recipe(id);
     
     try {

     // get the results from the recipe
     await state.recipe.getRecipe();

     state.recipe.calculateTime();
     state.recipe.calculateServings();

     // render result to UI
     console.log(state.recipe);
     
     } catch({ message }) {
       alert(message)
     }
     
  }
};

// listen for hashchange and browser load event
['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeController));

