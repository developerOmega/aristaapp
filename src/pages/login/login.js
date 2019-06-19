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
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { RegisterPage } from '../register/register';
import { Months } from '../months/months';
import { Facebook } from '@ionic-native/facebook';
var LoginPage = /** @class */ (function () {
    function LoginPage(http, navCtrl, apiCtrl, storage, platform, loading, facebook) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.apiCtrl = apiCtrl;
        this.storage = storage;
        this.platform = platform;
        this.loading = loading;
        this.facebook = facebook;
        this.user = {};
        this.showUser = false;
    }
    LoginPage.prototype.ionViewWillEnter = function () {
    };
    LoginPage.prototype.logIn = function () {
        var _this = this;
        var formData = new FormData();
        formData.append("email", this.email);
        formData.append("password", this.password);
        var url = this.apiCtrl.socket + 'authenticate/';
        console.log(url);
        var auth_token;
        var user;
        var loader = this.loading.create({});
        loader.present().then(function () {
            _this.http.post(url, formData).subscribe(function (data) {
                console.log("Credenciales correctas", data);
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
                console.log("Error");
                loader.dismiss();
            });
        });
    };
    LoginPage.prototype.loginFacebook = function () {
        var _this = this;
        this.facebook.login(['public_profile', 'email'])
            .then(function (rta) {
            console.log(rta.status);
            if (rta.status == 'connected') {
                _this.getInfo();
            }
            ;
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    LoginPage.prototype.viewMonths = function () {
        this.navCtrl.push(Months);
    };
    LoginPage.prototype.Registration = function () {
        this.navCtrl.push(RegisterPage);
    };
    var _a;
    LoginPage = __decorate([
        Component({
            selector: 'login-page',
            templateUrl: 'login.html',
            providers: [Api, Data]
        }),
        __metadata("design:paramtypes", [Http,
            NavController,
            Api,
            Storage,
            Platform,
            LoadingController, typeof (_a = typeof Facebook !== "undefined" && Facebook) === "function" ? _a : Object])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map