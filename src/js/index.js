import Search from './models/Search';
import { handleErrors } from '../../handlers/handlers';
import { element } from './views/base';
import * as searchView from './views/searchView';

/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping List
 * - Liked recipes
 */ 
const state = {};


 async function handleSubmit(e) {

  e.preventDefault();

  // input field value
  const query = searchView.getInput();
  
  // only proceed if there is a value
  if (query){
     // search object
     state.search = new Search(query);

     // disable button to prevent double
     // form submission
     element.searchButton.disabled = true;

     // prepare UI for changes

     // search for recipes 
     await state.search.getRecipe().catch(handleErrors);

     element.searchButton.disabled = false;
     console.log(await state.search.getRecipe());

     // display result on UI
  }
  
}
element.searchForm.addEventListener('submit', handleSubmit);




