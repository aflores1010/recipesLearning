import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { RecipeModel } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { RecipePage } from '../recipe/recipe';
import { ShoppingListService } from '../../services/shopping-list.service';

@IonicPage()
@Component({
  selector: 'page-recipe-detail',
  templateUrl: 'recipe-detail.html',
})
export class RecipeDetailPage {
  public recipe: RecipeModel;
  public index: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewController: ViewController,
              public recipeService: RecipeService,
              public shoppingListService: ShoppingListService) {

                this.recipe = this.navParams.get('recipe');
                this.index = this.navParams.get('ind');
                console.log(this.recipe.title);
                console.log(this.index);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeDetailPage');
  }

  ionViewWillEnter() {

  }
  onAddIngredients() {
    this.shoppingListService.addProducts(this.recipe.ingredients);
    this.viewController.dismiss();
  }

  onEditRecipe(){
    this.navCtrl.push(RecipePage, {recipe: this.recipe, index: this.index, mode: 'Edit' });
    this.viewController.dismiss();
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.recipe);
    this.viewController.dismiss();
  }

  onClose() {
    this.viewController.dismiss();
  }

}
