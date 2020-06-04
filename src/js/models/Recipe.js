import config from '../../../config/config';
import axios from 'axios';

class Recipe {
   constructor(id) {
    this.id = id;
    this.title = '';
    this.author = '';
    this.img = '';
    this.url = '';
    this.ingredients = [];
   }


   async getRecipe() {
     try {

      const result = await axios.get(`${config.cors}/${config.baseEndPoint}/get?rId=${this.id}`);
      const { recipe } = result.data;
      const { title, publisher, image_url, source_url, ingredients } = recipe;
      this.title = title;
      this.author = publisher;
      this.img = image_url;
      this.url = source_url;
      this.ingredients = ingredients;

     } catch({ message }) {
       console.log(message);
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
          const units = [...shortUnits, 'kg', 'g'];

          // 1) Uniform Ingredients
          let ingredient = el.toLowerCase();
          longUnits.forEach((unit, index) => {
            ingredient = ingredient.replace(unit, shortUnits[index]);   
          }); 

           // 2) Remove parenthesis
           ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

          // 3) Parse ingredients into count, unit and ingredient
          const arrIngredient = ingredient.split(' ');
          const unitIndex = arrIngredient.findIndex(item => units.includes(item));
       
          let objIngredient;
          if (unitIndex >= 0) {
            // there is a unit
            // e.g. 4 1/2 cups, count is [4, 1/2]
            // e.g. 4 cups, count is [4]

            const unit = arrIngredient.splice(unitIndex,1).join('');
            const ingredient = arrIngredient.slice(unitIndex).join(' ');
            const arrCount = arrIngredient.slice(0, unitIndex);
            
            let count;            
            if (arrCount.length === 1){
                if (arrCount[0].includes('+')){
                  count = Number(arrCount[0].replace('+', ''));
                }
                else {
                  let strCount = arrCount[0].replace('-', '+');
                  count = Number(eval(strCount).toFixed(2));
               }
            }
            else {
              count = eval(arrCount.join('+'));
            }
            objIngredient = {
              count: count,
              unit: unit,
              ingredient: ingredient
            }
          }
          else if (Number(arrIngredient[0])) {
            // No unit, but first element is a number
            objIngredient = {
              count: Number(arrIngredient[0]),
              unit: '',
              ingredient: arrIngredient.slice(1).join(' ')
            }
          }
          else if (unitIndex === -1) {
            // there is No unit and No number in the first position
            objIngredient = {
               count: 1,
               unit: '',
               ingredient
            }
          }

         return objIngredient;
     });
     this.ingredients = newIngredients;
   }

   updateServings(type) {

      // this.servings = 4
      // newServings = 3
      // count = 1
      /* decrement */
      // count  = 1 * 3/4 = 3/4
      // count =  3/4 * 2/3 = 1/2
      // count  = 1/2 * 1/2 = 1/4
      
      const newServings = (type === 'dec') ? this.servings - 1 : this.servings + 1;
      const mappedIngredients = this.ingredients.map(ing => {
          return {
            ...ing,
            count: ing.count = ing.count * (newServings / this.servings)
          }
      });
      this.ingredients = mappedIngredients;
      this.servings = newServings;
   }
}

export default Recipe;