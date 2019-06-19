var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
/*
  Generated class for the Storage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var Data = /** @class */ (function () {
    function Data(storage) {
        this.storage = storage;
    }
    Data.prototype.saveInfo = function (name, data) {
        this.storage.set(name, data);
    };
    Data.prototype.getInfo = function (name) {
        return this.storage.get(name);
    };
    Data.prototype.getData = function () {
        return this.storage.get('credentials');
    };
    Data.prototype.save = function (data) {
        var newData = JSON.stringify(data);
        this.storage.set('credentials', newData);
    };
    Data.prototype.clear = function () {
        this.storage.clear();
    };
    Data.prototype.remove = function (param) {
        this.storage.remove(param);
    };
    Data.prototype.keys = function () {
        this.storage.keys();
    };
    Data = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], Data);
    return Data;
}());
export { Data };
//# sourceMappingURL=data.js.map