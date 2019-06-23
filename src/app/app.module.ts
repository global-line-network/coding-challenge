import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';
import { IonicStorageModule } from '@ionic/storage';
import { NgxPaginationModule } from "ngx-pagination";


import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninPage } from '../pages/signin/signin';
import { UserListPage } from '../pages/user-list/user-list';
import { AddUserPage } from '../pages/add-user/add-user';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { LoginProvider } from '../providers/login/login';
import { UsersProvider } from '../providers/users/users';

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    UserListPage,
    AddUserPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    UserListPage,
    AddUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    LoginProvider,
    UsersProvider
  ]
})
export class AppModule { }
