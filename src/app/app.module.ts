import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { RecipesPage } from '../pages/recipes/recipes';
import { RecipePage } from '../pages/recipe/recipe';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListService } from '../services/shopping-list.service';
import { RecipeService } from '../services/recipe.service';
import { RecipeDetailPage } from '../pages/recipe-detail/recipe-detail';

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    RecipesPage,
    RecipePage,
    TabsPage,
    RecipeDetailPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    RecipesPage,
    RecipePage,
    TabsPage,
    RecipeDetailPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
