import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'; //for ionic v.4
import { JournalsService } from '../providers/journals-service/journals-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private sqlite: SQLite,
    private journalsService: JournalsService
    ) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        this.createDatabase();
      });
    }

  private createDatabase(){
    this.sqlite.create({
      name: 'arista.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      this.journalsService.setDatabase(db);
      this.journalsService.createTable();
      console.log("BD: ", db);
    })
    .catch(error =>{
      console.log("Error al crear la BD: ");
      console.error(error);
    });
  }

}

