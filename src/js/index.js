import Search from './models/Search';
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


 const handleSubmit = async (e) => {

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

    catch({ message }) {
      console.info('Something wrong with Search...');
    }
  }    
}

element.searchForm.addEventListener('submit', handleSubmit);

function handleClick(e){
  const button =  e.target.closest('.btn-inline');
  const nextPage = Number(button.dataset.goto);
  searchView.clearResult();
  searchView.renderRecipes(state.search.result, nextPage);
}

element.resultPerPage.addEventListener('click', handleClick);