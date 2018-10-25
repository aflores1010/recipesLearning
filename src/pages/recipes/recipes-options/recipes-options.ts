import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'page-recipes-options',
    templateUrl: 'recipes-options.html'
})
export class RecipesOptions {

    constructor(private viewController: ViewController) {

    }

    onAction(action: string){
        this.viewController.dismiss({action: action});
    }

}