import { Config } from 'ionic-angular';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { Journal } from '../pages/journal/journal';
import { Months } from '../pages/months/months';
import { Month1 } from '../pages/month1/month1';
import { Month2 } from '../pages/month2/month2';
import { Month3 } from '../pages/month3/month3';
import { Month4 } from '../pages/month4/month4';
import { Month5 } from '../pages/month5/month5';
import { Month6 } from '../pages/month6/month6';
import { Month7 } from '../pages/month7/month7';
import { Month8 } from '../pages/month8/month8';
import { Month9 } from '../pages/month9/month9';
import { ShowJournal } from '../pages/show-journal/show-journal';



import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    Journal,
    Months,
    Month1,
    Month2,
    Month3,
    Month4,
    Month5,
    Month6,
    Month7,
    Month8,
    Month9,
    ShowJournal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    Journal,
    Months,
    Month1,
    Month2,
    Month3,
    Month4,
    Month5,
    Month6,
    Month7,
    Month8,
    Month9,
    ShowJournal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
