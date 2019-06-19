var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ElementRef, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
var Api = /** @class */ (function () {
    function Api(http, el, navCtrl, storage) {
        this.http = http;
        this.el = el;
        this.navCtrl = navCtrl;
        this.storage = storage;
        //NOTAS DEL PROGRAMADOR: ESTA CAMBIALA DEPENDIENDO DE SI QUIERES USAR LOCAL O NRUTAS
        this.socket = "https://floating-gorge-28584.herokuapp.com/api/v1/";
        // this.socket = "http://localhost:3000/api/v1/";  
    }
    Api.prototype.get = function (url) {
        var _this = this;
        url = this.socket + url;
        return new Promise(function (resolve) {
            _this.storage.get("bearer").then(function (credentials) {
                console.log("bearer");
                console.log(credentials);
                _this.credentials = credentials;
                console.log(_this.credentials);
                var api_headers = new HttpHeaders().set('Authorization', 'Bearer ' + _this.credentials);
                api_headers.set('Access-Control-Allow-Origin', '*');
                _this.http.get(url, { headers: api_headers }).subscribe(function (data) {
                    _this.data = data;
                    resolve(_this.data);
                    _this.storage.set("valid", true);
                }, function (error) {
                    _this.storage.set("valid", false);
                    console.log('Get to url: ' + url + ' failed');
                    console.log("error");
                    console.log(error);
                });
            });
        });
    };
    Api.prototype.post = function (url, data) {
        var _this = this;
        url = this.socket + url;
        return new Promise(function (resolve) {
            _this.storage.get("bearer").then(function (credentials) {
                console.log("bearer");
                console.log(credentials);
                _this.credentials = credentials;
                console.log(_this.credentials);
                var params = new HttpParams();
                var api_headers = new HttpHeaders().set('Authorization', 'Bearer ' + _this.credentials);
                console.log("headers");
                console.log(api_headers);
                _this.http.post(url, data, { headers: api_headers }).subscribe(function (data) {
                    _this.data = data;
                    resolve(_this.data);
                    _this.storage.set("valid", true);
                }, function (error) {
                    _this.storage.set("valid", false);
                    console.log('Post to url: ' + url + ' failed');
                    console.log("error");
                    console.log(error);
                    console.log(error.status);
                });
            });
        });
    };
    Api = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            ElementRef,
            NavController,
            Storage])
    ], Api);
    return Api;
}());
export { Api };
//# sourceMappingURL=api.js.map