var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
/*
  Generated class for the JournalsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var JournalsService = /** @class */ (function () {
    function JournalsService() {
        this.db = null;
        console.log('Hello JournalsService Provider');
    }
    JournalsService.prototype.setDatabase = function (db) {
        if (this.db === null) {
            this.db = db;
        }
        console.log("setDatabase");
    };
    JournalsService.prototype.createTable = function () {
        console.log("Create TABLE journals");
        var sql = 'CREATE TABLE IF NOT EXISTS journals(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, context TEXT, event_date TEXT, created_at TEXT, update_at TEXT, month INTEGER);';
        return this.db.executeSql(sql, []);
    };
    JournalsService.prototype.index = function () {
        console.log("I N D E X");
        var sql = 'SELECT * FROM journals;';
        return this.db.executeSql(sql, [])
            .then(function (response) {
            var tasks = [];
            for (var index = 0; index < response.rows.length; index++) {
                tasks.push(response.rows.item(index));
            }
            return Promise.resolve(tasks);
        })
            .catch(function (error) { return Promise.reject(error); });
    };
    JournalsService.prototype.create = function (journal) {
        console.log("C R E A T E");
        var sql = 'INSERT INTO journals(title, context, event_date, created_at, update_at, month) VALUES(?,?,?,?,?,?)';
        return this.db.executeSql(sql, [journal.title, journal.context, journal.event_date, journal.created_at, journal.update_at, journal.month]);
    };
    JournalsService.prototype.show = function (value) {
        console.log("S H O W");
        var sql = 'SELECT * from journals WHERE id = ?';
        return this.db.executeSql(sql, [value]).then(function (response) {
            return Promise.resolve(response.rows.item(0));
        });
    };
    JournalsService.prototype.update = function (journal) {
        console.log("U P D A T E");
        var sql = 'UPDATE journals SET title=?, context=?,  WHERE id_journal=?';
        return this.db.executeSql(sql, [journal.title, journal.completed, journal.id_journal]);
    };
    JournalsService.prototype.delete = function (journal) {
        console.log("D E L E T E");
        var sql = 'DELETE FROM journals WHERE id_journal=?';
        return this.db.executeSql(sql, [journal.id_journal]);
    };
    JournalsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], JournalsService);
    return JournalsService;
}());
export { JournalsService };
//# sourceMappingURL=journals-service.js.map