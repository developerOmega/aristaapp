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
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Month1 } from '../month1/month1';
import { Month2 } from '../month2/month2';
import { Month3 } from '../month3/month3';
import { Month4 } from '../month4/month4';
import { Month5 } from '../month5/month5';
import { Month6 } from '../month6/month6';
import { Month7 } from '../month7/month7';
import { Month8 } from '../month8/month8';
import { Month9 } from '../month9/month9';
var Months = /** @class */ (function () {
    function Months(http, navCtrl, storage, platform) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.platform = platform;
    }
    Months.prototype.viewMonthOne = function () {
        this.navCtrl.push(Month1);
    };
    Months.prototype.viewMonthTwo = function () {
        this.navCtrl.push(Month2);
    };
    Months.prototype.viewMonthThree = function () {
        this.navCtrl.push(Month3);
    };
    Months.prototype.viewMonthFour = function () {
        this.navCtrl.push(Month4);
    };
    Months.prototype.viewMonthFive = function () {
        this.navCtrl.push(Month5);
    };
    Months.prototype.viewMonthSix = function () {
        this.navCtrl.push(Month6);
    };
    Months.prototype.viewMonthSeventh = function () {
        this.navCtrl.push(Month7);
    };
    Months.prototype.viewMonthEigth = function () {
        this.navCtrl.push(Month8);
    };
    Months.prototype.viewMonthNine = function () {
        this.navCtrl.push(Month9);
    };
    Months = __decorate([
        Component({
            selector: 'months-page',
            templateUrl: 'months.html'
        }),
        __metadata("design:paramtypes", [Http,
            NavController,
            Storage,
            Platform])
    ], Months);
    return Months;
}());
export { Months };
//# sourceMappingURL=months.js.map