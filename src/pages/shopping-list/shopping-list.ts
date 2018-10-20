import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';
import { SlOptions } from './sl-options/sl-options';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  productList: Ingredient[] =[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public shoppingListService: ShoppingListService,
              public menuController: MenuController,
              public popOverController: PopoverController,
              public authService: AuthService,
              public loadingController: LoadingController,
              public toastController: ToastController) {
  }

  ionViewWillEnter() {
    console.log('loggg');
    this.getProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }
  onAddItem(form: NgForm) {
      let newProduct: Ingredient = new Ingredient(form.value.ingredientName,  form.value.ingredientAmount);
      this.shoppingListService.addProduct(newProduct);
      this.getProducts();
  }

  getProducts(){
    this.productList = this.shoppingListService.getProducts();
    console.log('Some', this.productList);
  }
  onCheckItem(product: Ingredient){
    this.shoppingListService.removeProduct(product);
    this.getProducts();
  }

  logDrag(e){
    this.shoppingListService.removeProduct(e);
    this.getProducts();
  }

  onOpenMenu() {
    this.menuController.open();
  }

  handleError(err: string) {
    const toast = this.toastController.create({
      message: err,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingController.create({
      content: ''
    });
    const popOver = this.popOverController.create(SlOptions);
    popOver.present({ev: event});
    popOver.onDidDismiss(
      data => {
        console.log(data);
        if(data != null){
        loading.present();
        if (data.action == 'load'){
          loading.setContent('Loading ingredients...');
          this.authService.getActiveUser().getIdToken()
            .then((token:string)=>{
              loading.dismiss();
              this.shoppingListService.fetchList(token)
                .subscribe(
                  (list: Ingredient[])=>{
                    if(list){
                      this.productList = list;
                    } else {
                      this.productList = [];
                    }
                  console.log('Cargado Correctamente')},
                error => {
                  this.handleError(error.message);
                  console.log(error);
                });
            });
      } else {
        loading.setContent('Saving ingredients...')
        this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) =>{
              loading.dismiss();
              this.shoppingListService.storeList(token)
              .subscribe(
                (ok) => console.log(ok),
                error => {
                  this.handleError(error.message)
                  console.log(error);
                }
              )
            }
          );
      }}
    });
  }
}