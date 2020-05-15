import axios from 'axios';
import config from '../../../config/config';
 
 class Search {
   constructor(query){
    this.query = query;
    this.result = [];
   }

   async getRecipe(){
    try {
      const result = await axios.get(`${config.cors}${config.baseEndPoint}/search?q=${this.query}`);
      const { data } = result;
      this.result = data.recipes;
    }
    catch({ message }) {
      console.info('Error fetching request 😕');
      alert(message);
    } 
   }
 }

 export default Search;