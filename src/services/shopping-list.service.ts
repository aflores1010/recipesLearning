import { Ingredient } from '../models/ingredient';
import { Injectable } from '../../node_modules/@angular/core';
import { AuthService } from './auth.service';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ShoppingListService {
    private productList: Ingredient[] = [];

    constructor(
                public authService: AuthService,
                public httpClient: HttpClient){

    }

    addProduct(product:Ingredient) {
        this.productList.push(new Ingredient(product.name, product.amount));
        console.log(this.productList);
    }

    addProducts( products: Ingredient[] ) {
        this.productList.push(...products);
    }

    removeProduct(product:Ingredient){
        const position = this.productList.findIndex((productEl: Ingredient ) => {
            return productEl.name == product.name;
        });
        this.productList.splice(position, 1);
    }

    getProducts(){
        return this.productList.slice();
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        console.log(userId);
        return this.httpClient.put('https://ionic-2-recipebook-96e0a.firebaseio.com/' + userId + 
        '/shopping-list.json?auth='+token,
         this.productList);
    }


    

}