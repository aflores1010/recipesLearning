import { RecipeModel } from '../models/recipe';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '../../node_modules/@angular/core';

@Injectable()
export class RecipeService {
    private recipeList: RecipeModel[] = [];

    constructor( 
                public authService: AuthService,
                public httpClient: HttpClient
                ){

    }

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

    getUserId(){
        return this.authService.getActiveUser().uid;
    }

    storeRecipe(token: string) {
        return this.httpClient.put('https://ionic-2-recipebook-96e0a.firebaseio.com/' + this.getUserId() +
        '/recipe.json?auth='+token,
        this.recipeList);
    }

    fetchRecipe(token: string) : Observable <RecipeModel[]>{
        return this.httpClient.get<RecipeModel[]>('https://ionic-2-recipebook-96e0a.firebaseio.com/'
        + this.getUserId() + '/recipe.json?auth='+token)
        .pipe (
            map (recipes =>{
                for (let recipe of recipes){
                    if(!recipe.hasOwnProperty('ingredients')){
                        recipe.ingredients = [];
                    }
                }
                this.recipeList = recipes;
                return recipes;
            })
        )
    }

}