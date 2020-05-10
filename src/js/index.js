//Global App Controller
import Search from './models/Search';
import { handleErrors } from '../../handlers/handlers';

const search = new Search('rice');
const result = search.getRecipe();
result.catch(handleErrors);


