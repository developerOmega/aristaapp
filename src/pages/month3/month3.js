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
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Journal } from '../journal/journal';
var Month3 = /** @class */ (function () {
    function Month3(navCtrl, storage, platform) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.platform = platform;
    }
    Month3.prototype.ionViewWillEnter = function () {
    };
    Month3.prototype.journalView = function () {
        this.navCtrl.push(Journal, { month: 3 });
    };
    Month3 = __decorate([
        Component({
            selector: 'month3-page',
            templateUrl: 'month3.html'
        }),
        __metadata("design:paramtypes", [NavController,
            Storage,
            Platform])
    ], Month3);
    return Month3;
}());
export { Month3 };
//# sourceMappingURL=month3.js.map