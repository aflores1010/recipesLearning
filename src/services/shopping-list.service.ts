import { Ingredient } from '../models/ingredient';
export class ShoppingListService {
    private productList: Ingredient[] = [];


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
    

}