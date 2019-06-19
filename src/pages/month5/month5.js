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
import { Journal } from '../journal/journal';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';
import { ShowJournal } from '../show-journal/show-journal';
var Month5 = /** @class */ (function () {
    function Month5(http, navCtrl, storage, platform, apiCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.platform = platform;
        this.apiCtrl = apiCtrl;
    }
    Month5.prototype.ionViewWillEnter = function () {
        // let url = this.apiCtrl.socket + 'journals/';
        // console.log(url);
        var _this = this;
        this.apiCtrl.get('journals/').then(function (data) {
            console.log("asdasd", data);
            _this.journals = data;
        });
    };
    Month5.prototype.showJournal = function (journal) {
        var _this = this;
        var url_id = 'journals/' + journal.id;
        console.log(url_id);
        this.apiCtrl.get(url_id).then(function (data) {
            console.log("asdasd", data);
            _this.navCtrl.push(ShowJournal, { journals: data });
        });
    };
    Month5.prototype.journalView = function () {
        this.navCtrl.push(Journal, { month: 5 });
    };
    Month5 = __decorate([
        Component({
            selector: 'month5-page',
            templateUrl: 'month5.html',
            providers: [Api, Data]
        }),
        __metadata("design:paramtypes", [Http,
            NavController,
            Storage,
            Platform,
            Api])
    ], Month5);
    return Month5;
}());
export { Month5 };
//# sourceMappingURL=month5.js.map