import config from '../../../config/config';
import axios from 'axios';

class Recipe {
   constructor(id){
    this.id = id;
    this.title = '';
    this.author = '';
    this.img = '';
    this.url = ''
    this.ingredients = [];
   }


   async getRecipe(){
     try {

      const result = await axios.get(`${config.cors}${config.baseEndPoint}/get?rId=${this.id}`);
      const { recipe } = result.data;
      const { title, publisher, image_url, source_url, ingredients } = recipe;
      this.title = title;
      this.author = publisher;
      this.img = image_url;
      this.url = source_url;
      this.ingredients = ingredients;
      console.log(result);

     } catch({ message }) {
       alert('Error fetching recipe');
     }
   }

   calculateTime(){
    // assume we have 15 mins for every 3 ingredients
    
   }

   calculateServings(){
     this.servings = 4;
   }
   
}

export default Recipe;