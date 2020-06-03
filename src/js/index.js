import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import { element, showLoader, removeLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import Likes from './models/Likes';

/** 
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping List
 * - Liked recipes
 */
const state = {};
window.s = state;

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
      recipeView.clearRecipe();
      showLoader(element.recipe);

     // only highlight SEARCH recipe
     if (state.search) searchView.highlightRecipe(id);
     
     // create the recipe object
     state.recipe = new Recipe(id);

     try {

     // get the results from the recipe and parse Ingredients
     await state.recipe.getRecipe();
     state.recipe.parseIngredients();

     state.recipe.calculateTime();
     state.recipe.calculateServings();
     
     // render result to UI
     removeLoader();
     recipeView.renderRecipe(state.recipe);
     console.log(state.recipe)
     
     } catch({ message }) {
       alert(message)
     }
     
  }
};


// listen for hashchange and browser load event
['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeController));


/**
 * List Controller
 */

 const listController = () => {
      // create a new list if there is none yet
      if (!state.list){
        state.list = new List();
      }

      // add each ingredient to the list and UI
      state.recipe.ingredients.forEach(ing => {
         const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
         listView.renderItem(item);
      })
 }

 /* handle delete and update item events */

element.shopping.addEventListener('click', e => {
    const listItem = e.target.closest('.shopping__item');
    const itemId = Number(listItem.dataset.itemid);
  
      /* handle deleteItem */
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        
        // delete from list
        state.list.deleteItem(itemId);

       // delete from UI
       listView.deleteItem(itemId);

      /* handle count update */
    } else if (e.target.matches('.shopping__count-value')){
       // read the data from the interface
       const count = Number(e.target.value);

       // update the count in the db model
       if (count >= 1) {
         state.list.updateItem(itemId, count);
       }
    } 

});
 



/**
 * LIKE CONTROLLER
 */
 
 const controlLikes = () => {
    if (!state.like) state.like = new Likes();
    
    const id = state.recipe.id;

    // if recipe is not liked
    if (!state.like.isLiked(id)){
       // add to the like model
       state.like.addLike(
         id,
         state.recipe.title,
         state.recipe.author,
         state.recipe.img
       )
       // toggle the like button

       // update the UI
       console.log(state.like)

      // if recipe is  liked 
    } else if (state.like.isLiked(id)) {

       // remove from the like model
       state.like.unLike(id);

       // untoggle the like button


       // update the UI
       console.log(state.like);
    }
 }





/* Handle recipe button clicks */

// we use event delegation and attach the event handler
// on the recipe container because that's the element
// there at load time.
element.recipe.addEventListener('click', e => {

  // match button-decrease or any child element of button-decrease
  // we use matches() because there's is more than one element
  // to target

  if (e.target.matches('.btn-decrease, .btn-decrease *')){
      // to avoid negative values
      if (state.recipe.servings > 1){
         state.recipe.updateServings('dec');
         recipeView.updateServingsIngredients(state.recipe);
      }
  }

  // match button-increase or any child element of button-increase
  else if (e.target.matches('.btn-increase, .btn-increase *')){
      state.recipe.updateServings('inc');
      recipeView.updateServingsIngredients(state.recipe);
  }
  else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
     // add to list button
     listController();
  } else if (e.target.matches('.recipe__love, .recipe__love *')){
    controlLikes();
  }
});


window.l = new List();