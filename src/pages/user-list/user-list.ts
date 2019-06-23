import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AddUserPage } from '../../pages/add-user/add-user';
import { SigninPage } from '../../pages/signin/signin';


@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  public userdata: any[];
  public p = 1;
  public maxPage: any;
  public perPage: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UsersProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.getUserList();
  }

  getUserList() {
    var self = this;
    let loading = self.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    self.userProvider.handlelistusers(self.p)
      .then(resp => {
        loading.dismiss();
        self.userdata = resp['data'];
        self.maxPage = resp['total']
        self.perPage = resp['per_page']
      });
  }

  pageChanged(data) {
    var self = this;
    self.p = data;
    self.getUserList();
  }

  handleadduser() {
    var self = this;
    try {
      let modal = self.modalCtrl.create(AddUserPage, {}, { enableBackdropDismiss: false });
      modal.present();
      modal.onDidDismiss(data => {
        if (data) {
          self.p = 1;
          self.getUserList();
        }
      });
    } catch (e) {
      console.log("Exception in handleaddDeclineMessages: " + e);
    }

  }

  handledeleteuser(item) {
    console.log("Delete button clicked : " + item);
    let alert = this.alertCtrl.create({
      title: ' ',
      message: "Are you sure want to delete ?",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: "Ok",
          handler: () => {
            console.log('Delete clicked');
            this.handledelete(item);
          }
        }
      ]
    });
    alert.present();

  }

  handleupdateuser(item) {
    try {
      var self = this;
      let modal = this.modalCtrl.create(AddUserPage, { "item": item }, { enableBackdropDismiss: false });
      modal.onDidDismiss(data => {
        console.log("modalController dismiss : " + data);
        if (data && data.length) {
          self.p = data;
          self.getUserList();
        }
      });
      modal.present();

    } catch (e) {
      console.log("Exception in Edit Task SubCategory : " + e);
      alert("Exception in Edit SubCategory : " + e);
    }

  }

  handledelete(userId) {
    try {
      var self = this;
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      self.userProvider.handledeleteuser(userId)
        .then(data => {
          loading.dismiss();
          self.p = 1;
          self.getUserList();
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
      console.log("Exception in Edit Task SubCategory : " + e);
      alert("Exception in Edit SubCategory : " + e);
    }
  }

  handlelogout() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 1000
    });
    loading.present();
    this.navCtrl.setRoot(SigninPage);
  }

}
