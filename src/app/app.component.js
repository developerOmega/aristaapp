var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/';
import { SQLite } from '@ionic-native/sqlite'; //for ionic v.4
import { JournalsService } from '../providers/journals-service/journals-service';
import { Months } from '../pages/months/months';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, sqlite, journalsService) {
        var _this = this;
        this.sqlite = sqlite;
        this.journalsService = journalsService;
        this.rootPage = Months;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.createDatabase();
        });
    }
    MyApp.prototype.createDatabase = function () {
        var _this = this;
        this.sqlite.create({
            name: 'arista.db',
            location: 'default' // the location field is required
        })
            .then(function (db) {
            _this.journalsService.setDatabase(db);
            _this.journalsService.createTable();
            console.log("BD: ", db);
        })
            .catch(function (error) {
            console.log("Error al crear la BD: ");
            console.error(error);
        });
    };
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            SQLite,
            JournalsService])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map