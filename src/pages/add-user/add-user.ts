import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {
  public title: any;
  public edit: boolean = true;
  updateUserObj = null;
  userId: any;
  email: any;
  fName: any;
  lName: any;
  job: any;
  objrequest: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public userProvider: UsersProvider,
    public toastCtrl: ToastController
  ) {
    if (this.navParams.get("item")) {
      this.edit = true
      this.updateUserObj = this.navParams.get("item");
      this.userId = this.updateUserObj.id;
      this.fName = this.updateUserObj.first_name;
      this.lName = this.updateUserObj.last_name;
      this.email = this.updateUserObj.email;
    } else {
      this.edit = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  handlecancel() {
    this.viewCtrl.dismiss("success");
  }

  handleCreateUser() {
    var self = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    self.objrequest = {};
    self.objrequest['name'] = self.fName + ' ' + self.lName;
    self.objrequest['job'] = self.job;
    if (!this.edit) {
      self.userProvider.handlecreateuser(self.objrequest)
        .then(data => {
          loading.dismiss();
          self.viewCtrl.dismiss("success");
        })
        .catch(error => {
          loading.dismiss();
          const toast = this.toastCtrl.create({
            message: error.error.error,
            duration: 2000
          });
          toast.present();
        });
    } else {
      self.userProvider.handleupdateuser(this.userId, self.objrequest)
        .then(data => {
          loading.dismiss();
          self.viewCtrl.dismiss("success");
        })
        .catch(error => {
          loading.dismiss();
          const toast = this.toastCtrl.create({
            message: error.error.error,
            duration: 2000
          });
          toast.present();
        });
    }
  }

}
