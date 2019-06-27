import { Injectable } from '@angular/core';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'; //for ionic v.4

/*
  Generated class for the JournalsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JournalsService {
	
	db: SQLiteObject = null;
  
  constructor() {
    console.log('Hello JournalsService Provider');
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
    console.log("setDatabase");
  }

  createTable(){
  	console.log("CreateTable journals");

	  // let sql = 'CREATE TABLE IF NOT EXISTS journals(id_journal INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, context TEXT, event_date TEXT, created_at TEXT, update_at TEXT, month INTEGER, user_id INTEGER FOREIGN KEY); ';
	  // return this.db.executeSql(sql, []);

  }

  index(){
  	console.log("I N D E X");

	  let sql = 'SELECT * FROM journals;';
	  return this.db.executeSql(sql, [])
	  .then(response => {
	    let tasks = [];
	    for (let index = 0; index < response.rows.length; index++) {
	    	
	      tasks.push( response.rows.item(index) );
	    }
	    return Promise.resolve( tasks );
	  })
	  .catch(error => Promise.reject(error));
	}

	create(journal: any){
	  let sql = 'INSERT INTO tasks(title, context, event_date, created_at, update_at, month) VALUES(?,?,?,?,?,?)';
	  return this.db.executeSql(sql, [journal.title, journal.context, journal.event_date, journal.createt_at, journal.uptdate_at, journal.month]);
	}

	find_by_title(value: any) {
	  let sql = 'SELECT * from journals WHERE title = ? AND created_at = ? AND month = ?';
	  return this.db.executeSql(sql, [value]).then(response=>{
	  	return Promise.resolve(response.rows.item(0));
	  });	  
	}

	update(journal: any){
  	let sql = 'UPDATE journals SET title=?, context=?,  WHERE id_journal=?';
  	return this.db.executeSql(sql, [journal.title, journal.completed, journal.id_journal]);
	}

	delete(journal: any){
	  let sql = 'DELETE FROM journals WHERE id_journal=?';
	  return this.db.executeSql(sql, [journal.id_journal]);
	}


}
