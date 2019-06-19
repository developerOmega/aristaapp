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
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';
var ShowJournal = /** @class */ (function () {
    function ShowJournal(http, navCtrl, navParams, storage, platform, apiCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.platform = platform;
        this.apiCtrl = apiCtrl;
    }
    ShowJournal.prototype.ionViewWillEnter = function () {
        this.journals = this.navParams.get('journals');
        this.title = this.journals.title;
        this.content = this.journals.context;
        console.log("SHOW", this.journals.title);
    };
    ShowJournal = __decorate([
        Component({
            selector: 'show-journal-page',
            templateUrl: 'show-journal.html',
            providers: [Api, Data]
        }),
        __metadata("design:paramtypes", [Http,
            NavController,
            NavParams,
            Storage,
            Platform,
            Api])
    ], ShowJournal);
    return ShowJournal;
}());
export { ShowJournal };
//# sourceMappingURL=show-journal.js.map