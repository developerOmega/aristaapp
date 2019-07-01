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
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { JournalsService } from '../../providers/journals-service/journals-service';
var Journal = /** @class */ (function () {
    function Journal(http, navCtrl, navParams, platform, storage, apiCtrl, loading, toastCtrl, camera, journalsService) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.storage = storage;
        this.apiCtrl = apiCtrl;
        this.loading = loading;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.journalsService = journalsService;
        this.event_date = '';
        this.title = '';
        this.content = '';
        this.count = 0;
        this.photos = [];
    }
    Journal.prototype.ionViewWillEnter = function () {
        this.month = this.navParams.get('month'); //MES del cuadrito
        console.log(this.month);
        var date = new Date();
        //Fecha en que se creo el journal
        this.event_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        console.log(this.event_date);
    };
    Journal.prototype.getJournalLast = function () {
        var _this = this;
        this.apiCtrl.get('journals').then(function (data) {
            console.log('JORUNALSGET:', data);
            _this.journal = data;
        });
    };
    Journal.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 1000,
            targetHeight: 1000
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.photos[_this.count] = _this.photo = 'data:image/jpeg;base64,' + imageData;
            _this.count++;
            _this.getJournalLast();
            // var body: any = {
            // 	photo: this.photo,
            // }
        }, function (err) {
            console.log("Error: ", err);
        });
    };
    Journal.prototype.savePhoto = function (id) {
        if (this.photo || (this.photo && this.photo.length > 0)) {
            var body = {
                src: this.photo,
                journal_id: id
            };
            var url = 'journals/' + id + '/photos';
            this.apiCtrl.post(url, body).then(function (data) {
                console.log("Take Photo:", data);
            });
        }
    };
    Journal.prototype.saveJournal = function () {
        var _this = this;
        var body = {
            title: this.title,
            context: this.content,
            event_date: this.event_date,
            month: this.month
        };
        this.apiCtrl.post("journals", body).then(function (data) {
            console.log("Exito----------------", data);
            _this.journal = data;
            _this.savePhoto(_this.journal.id);
            console.log("ID------------", _this.journal.id);
            // this.savePhoto();
            _this.navCtrl.pop();
        });
    };
    Journal.prototype.saveJournalSQLite = function () {
        var _this = this;
        console.log("metodo save journal SQLite");
        var body = {
            title: this.title,
            context: this.content,
            event_date: this.event_date,
            create_at: this.event_date,
            update_at: this.event_date,
            month: this.month
        };
        // console.log("body titulo -----", body.title );
        // console.log("body content----", body.context );
        // console.log("body E D----", body.event_date );
        // console.log("body C D----", body.create_at );
        // console.log("body U D----", body.update_at );
        // console.log("body month----", body.month );
        this.journalsService.create(body)
            .then(function (journals) {
            console.log("Exitoso ", JSON.stringify(journals));
            _this.newJournal = journals;
        })
            .catch(function (error) {
            console.log("Error create: ", JSON.stringify(error));
            // console.error( error );
        });
        this.navCtrl.pop();
    };
    Journal = __decorate([
        Component({
            selector: 'journal-page',
            templateUrl: 'journal.html',
            providers: [Api, Data]
        }),
        __metadata("design:paramtypes", [Http,
            NavController,
            NavParams,
            Platform,
            Storage,
            Api,
            LoadingController,
            ToastController,
            Camera,
            JournalsService])
    ], Journal);
    return Journal;
}());
export { Journal };
//# sourceMappingURL=journal.js.map