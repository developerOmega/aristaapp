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
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';
import { ShowJournal } from '../show-journal/show-journal';
import { JournalsService } from '../../providers/journals-service/journals-service';
var Month2 = /** @class */ (function () {
    function Month2(navCtrl, storage, platform, apiCtrl, journalsService) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.platform = platform;
        this.apiCtrl = apiCtrl;
        this.journalsService = journalsService;
        this.journals_sql = [];
    }
    Month2.prototype.ionViewDidLoad = function () {
        this.getAllJournals();
    };
    Month2.prototype.ionViewWillEnter = function () {
        this.getAllJournals();
    };
    Month2.prototype.journalView = function () {
        this.navCtrl.push(Journal, { month: 2 });
    };
    Month2.prototype.getAllJournals = function () {
        var _this = this;
        this.journalsService.index()
            .then(function (journals) {
            console.log("JOURNALS ", journals);
            _this.journals_sql = journals;
        })
            .catch(function (error) {
            console.log("Error index: ");
            console.error(error);
        });
    };
    Month2.prototype.showJournalSQL = function (journal) {
        var _this = this;
        this.journalsService.show(journal.id)
            .then(function (journal) {
            console.log("JOURNAL ", journal);
            _this.navCtrl.push(ShowJournal, { infoJournal: journal });
        })
            .catch(function (error) {
            console.log("Error index: ");
            console.error(error);
        });
    };
    Month2 = __decorate([
        Component({
            selector: 'month2-page',
            templateUrl: 'month2.html',
            providers: [Api, Data]
        }),
        __metadata("design:paramtypes", [NavController,
            Storage,
            Platform,
            Api,
            JournalsService])
    ], Month2);
    return Month2;
}());
export { Month2 };
//# sourceMappingURL=month2.js.map