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
import { NavController, Platform, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { Months } from '../months/months';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(http, navCtrl, apiCtrl, storage, platform, loading, toastCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.apiCtrl = apiCtrl;
        this.storage = storage;
        this.platform = platform;
        this.loading = loading;
        this.toastCtrl = toastCtrl;
        this.email = '';
        this.first_name = '';
        this.last_name = '';
        this.password = '';
        this.password_confirmation = '';
        this.full_name = '';
        this.promotions = false;
        this.terms = false;
        this.privacy = false;
    }
    RegisterPage.prototype.ionViewWillEnter = function () {
    };
    RegisterPage.prototype.SaveRegister = function () {
        var _this = this;
        this.full_name = this.first_name + ' ' + this.last_name;
        var formData = new FormData();
        formData.append("user[email]", this.email);
        formData.append("user[password]", this.password);
        formData.append("user[password_confirmation]", this.password_confirmation);
        formData.append("user[full_name]", this.full_name);
        var url = this.apiCtrl.socket + 'users';
        var auth_token;
        var user;
        var loader = this.loading.create({});
        loader.present().then(function () {
            _this.http.post(url, formData).subscribe(function (data) {
                console.log("CREDENCIALES CORRECTAS", data);
                user = data;
                user = user._body;
                user = JSON.parse(user);
                auth_token = user.auth_token;
                _this.storage.set("current_user", user);
                _this.storage.set("bearer", auth_token).then(function (valid) {
                    _this.storage.set("valid", true);
                    loader.dismiss();
                    _this.navCtrl.setRoot(Months);
                });
            }, function (error) {
                console.log("INCORRECTO ", error);
                loader.dismiss();
                console.log('Bearer query failed');
            });
        });
    };
    RegisterPage = __decorate([
        Component({
            selector: 'register-page',
            templateUrl: 'register.html',
            providers: [Api, Data]
        }),
        __metadata("design:paramtypes", [Http,
            NavController,
            Api,
            Storage,
            Platform,
            LoadingController,
            ToastController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map