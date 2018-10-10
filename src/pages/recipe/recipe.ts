import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '../../../node_modules/@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { RecipeModel } from '../../models/recipe';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  mode = 'new';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: RecipeModel;
  index: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertController: AlertController,
              private toastController: ToastController,
              private recipeService: RecipeService) {
    this.mode = this.navParams.get('mode');

    if(this.mode ==='Edit') {

      this.recipe = this.navParams.get('recipe');
      console.log('Recipe in recipe: ', this.recipe);
      this.index = this.navParams.get('ind');
      this.editRecipe();
    }
    this.initializeForm();
  }

  ionViewDidLoad() {
    console.log(' as ', this.mode);
  }

  private editRecipe() {

  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode=='Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients){
        ingredients.push(new FormControl(ingredient.name, Validators.required ));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl( description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients),
    });
  }
  onSubmit(recipeForm:any) {
    let ingredients = [];
    if(recipeForm.value.ingredients.length >0){
      ingredients = recipeForm.value.ingredients.map(name =>{
        return {name: name, amount: 1};
      });
      recipeForm.value.ingredients = ingredients;
    }

    if(this.mode==='Edit') {
      this.recipe.title = recipeForm.value.title;
      this.recipe.difficulty = recipeForm.value.difficulty;
      this.recipe.description = recipeForm.value.description;
      this.recipe.ingredients = recipeForm.value.ingredients;

      this.recipeService.updateRecipe(this.index, this.recipe);
    } else {
      this.recipeService.addRecipe(recipeForm.value);
    }
    this.recipeForm.reset();
    this.navCtrl.pop();

  }
  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title:'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len>0){
              for (let i = len -1; i >=0; i--){
                fArray.removeAt(i);
              }
              const toast = this.toastController.create({
                message: 'All ingredients deleted.',
                duration:3000,
                position: 'top'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert(){
    return this.alertController.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
      { 
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Add',
        handler: data=>{
          if(data.name.trim()=='' || data.name==null){
            const toast = this.toastController.create({
              message: 'Please enter a valid value.',
              duration:3000,
              position: 'top'
            });
            toast.present();
            return;
          }
          (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required))
          const toast = this.toastController.create({
            message: 'Item Added.',
            duration:3000,
            position: 'top'
          });
          toast.present();
        }
      },

      ]
    });
  }

}
