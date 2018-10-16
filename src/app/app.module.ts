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
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';
import { SlOptions } from '../pages/shopping-list/sl-options/sl-options';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'  


@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    RecipesPage,
    RecipePage,
    TabsPage,
    RecipeDetailPage,
    SigninPage,
    SignupPage,
    SlOptions

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    RecipesPage,
    RecipePage,
    TabsPage,
    RecipeDetailPage,
    SigninPage,
    SignupPage,
    SlOptions
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    AuthService,
    RecipeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
