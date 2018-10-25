import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { RecipeService } from '../../services/recipe.service';
import { RecipeModel } from '../../models/recipe';
import { RecipeDetailPage } from '../recipe-detail/recipe-detail';
import { RecipesOptions } from './recipes-options/recipes-options';
import { AuthService } from '../../services/auth.service';

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
                public modalController: ModalController,
                public popOverController: PopoverController,
                public authService: AuthService,
                public loadingController: LoadingController,
                public toastController: ToastController) {
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

  toastPresent(message: string){
    const toast = this.toastController.create({
      duration: 3000,
      message: message,
      position: 'down'
    });
    toast.present();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingController.create({
      content: ''
    });
    const popOver = this.popOverController.create(RecipesOptions);
    popOver.present({ev: event});
    popOver.onDidDismiss(
      data =>{
        console.log('Recibe en el dismiss ', data);
        if(data != null) {
          loading.present();
          if ( data.action == 'load') {
            loading.setContent('Loading recipe');
            this.authService.getActiveUser().getIdToken()
              .then((token: string)=>{
                loading.dismiss();
                this.recipeService.fetchRecipe(token)
                  .subscribe(
                    (recipes: RecipeModel[])=>{
                      if(recipes){
                        this.recipeList = recipes;
                      }else {
                        this.recipeList = []
                      }
                      this.toastPresent('Cargado correctamente');
                  }, (error) =>{
                     this.toastPresent(error.message);
                  })
              });
          } else {
            loading.setContent('Saving recipe');
            this.authService.getActiveUser().getIdToken()
              .then(
                (token: string)=>{
                  loading.dismiss();
                  this.recipeService.storeRecipe(token)
                    .subscribe(
                      ()=>{ 
                        this.toastPresent('Saved Correctly');
                      },
                    error =>{
                      this.toastPresent(error.message);
                    })
                }
              );

          }
        }
    });
  }

}
