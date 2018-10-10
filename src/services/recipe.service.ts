import { RecipeModel } from '../models/recipe';
export class RecipeService {
    private recipeList: RecipeModel[] = [];

    addRecipe( recipe: RecipeModel){
        this.recipeList.push(new RecipeModel(recipe.title, recipe.description, recipe.difficulty, recipe.ingredients));
        console.log(this.recipeList);
    }

    removeRecipe(recipe: RecipeModel) {
        const position = this.recipeList.findIndex((recipeEl: RecipeModel)=>{
            return recipeEl.title ==recipe.title;
        });
        this.recipeList.splice(position, 1);
        console.log(this.recipeList);
    }

    getRecipes(){
        return this.recipeList.slice();
    }

    updateRecipe(index:number ,recipe: RecipeModel) {
        console.log(recipe);
        this.recipeList[index] =  new RecipeModel(recipe.title, recipe.description, recipe.difficulty, recipe.ingredients);
        console.log(this.recipeList[index]);
    }

}