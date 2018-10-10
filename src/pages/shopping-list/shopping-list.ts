import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  productList: Ingredient[] =[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public shoppingListService: ShoppingListService) {
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

}