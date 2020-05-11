import axios from 'axios';
import config from '../../../config/config';
 
 class Search {
   constructor(query){
    this.query = query;
   }

   async getRecipe(){
    const result = await axios.get(`${config.cors}${config.baseEndPoint}/search?q=${this.query}`);
    const { data } = result;
    this.result = data.recipes;
    return this.result;
   }
 }

 export default Search;