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


   async getRecipe() {
     try {

      const result = await axios.get(`${config.cors}${config.baseEndPoint}/get?rId=${this.id}`);
      const { recipe } = result.data;
      const { title, publisher, image_url, source_url, ingredients } = recipe;
      this.title = title;
      this.author = publisher;
      this.img = image_url;
      this.url = source_url;
      this.ingredients = ingredients;

     } catch({ message }) {
       alert('Error fetching recipe');
     }
   }

   calculateTime() {

    // assume we have 15 mins for every 3 ingredients
    const totalIngredients = this.ingredients.length;
    const period = Math.ceil(totalIngredients / 3);
    this.time = period * 20;
    
   }

   calculateServings(){
     this.servings = 4;
   }
   

   parseIngredients(){
     const newIngredients = this.ingredients.map(el => {

          const longUnits = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
          const shortUnits = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

          // 1) Uniform Ingredients
          let ingredient = el.toLowerCase();
          longUnits.forEach((unit, index) => {
            ingredient = ingredient.replace(unit, shortUnits[index]);   
          }); 

           // 2) Remove parenthesis
           ingredient = ingredient.replace(/ *\([^)]*\) */g, "");

          // 3) Parse ingredients into count, unit and ingredient

     });
     this.ingredients = newIngredients;
   }
}

export default Recipe;