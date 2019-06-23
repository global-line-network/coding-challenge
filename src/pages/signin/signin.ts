import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserListPage } from '../../pages/user-list/user-list';
import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  inputEmail;
  inputPassword;
  objrequest;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public loginProvider: LoginProvider,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }


  public login() {
    try {
      var self = this;
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      self.objrequest = {};
      self.objrequest['email'] = self.inputEmail;
      self.objrequest['password'] = self.inputPassword;
      self.loginProvider.handlelogin(self.objrequest)
        .then(data => {
          loading.dismiss();
          this.navCtrl.setRoot(UserListPage);
        })
        .catch(error => {
          loading.dismiss();
          const toast = this.toastCtrl.create({
            message: error.error.error,
            duration: 2000
          });
          toast.present();
        });
    } catch (e) {
      console.log('Exception in login :' + e);
    }
  }

}
