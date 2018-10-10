import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { RecipeService } from '../../services/recipe.service';
import { RecipeModel } from '../../models/recipe';
import { RecipeDetailPage } from '../recipe-detail/recipe-detail';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipeList: RecipeModel[] = [];
  recipePage = RecipePage;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public recipeService: RecipeService,
                public modalController: ModalController) {
            
            //console.log('Hola', this.recipeList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  ionViewWillEnter() {
    console.log('somethin');
    this.recipeList = this.recipeService.getRecipes();
    console.log('Hola', this.recipeList);
  }

  onLoadRecipe(recipe:RecipeModel, index: number){
    let recipeModal = this.modalController.create(RecipeDetailPage, {recipe: recipe, ind:index});
    recipeModal.onDidDismiss(data =>{
      console.log(data);
    })
    recipeModal.present();
    recipeModal.onDidDismiss(() => {
      this.recipeList = this.recipeService.getRecipes();
    });
  }

}
