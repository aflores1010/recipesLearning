import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService,
              public menuController: MenuController,
              public loadingController: LoadingController,
              public toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onOpenMenu() {
    this.menuController.open();
  }

  onSignUp(form: NgForm) {
    let toast= this.toastController.create({
      message: '',
      duration: 3000,
      position: 'top'
    });
    const loading = this.loadingController.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authService.signUp(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        toast.setMessage(error.message)
        toast.present();

      });
  }

}
