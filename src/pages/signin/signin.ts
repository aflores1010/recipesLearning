import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuController: MenuController,
              public authService: AuthService,
              public toastController: ToastController,
              public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onOpenMenu() {
    this.menuController.open();
  }

  onSubmit(form: NgForm) {
    console.log('something');
    const toast = this.toastController.create({
      message: '',
      duration: 4000,
      position: 'top'
    });
    const loading = this.loadingController.create({
      content: 'Signin in...'
    });
    loading.present();
    this.authService.signIn(form.value.email, form.value.password)
    .then(()=>{
    loading.dismiss();
      console.log('something')
    })
    .catch((error) => {
      loading.dismiss();
      toast.setMessage(error.message);
      toast.present();
    })
  }

}
