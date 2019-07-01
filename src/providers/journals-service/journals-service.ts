import { Injectable } from '@angular/core';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'; //for ionic v.4

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
  	console.log("Create TABLE journals");

	  let sql = 'CREATE TABLE IF NOT EXISTS journals(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, context TEXT, event_date TEXT, created_at TEXT, update_at TEXT, month INTEGER);';
	  
	  return this.db.executeSql(sql, []);
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
		console.log("C R E A T E");

	  let sql = 'INSERT INTO journals(title, context, event_date, created_at, update_at, month) VALUES(?,?,?,?,?,?)';
	  return this.db.executeSql(sql, [journal.title, journal.context, journal.event_date, journal.created_at, journal.update_at, journal.month]);
	}

	show(value: any) {
		console.log("S H O W");

	  let sql = 'SELECT * from journals WHERE id = ?';
	  return this.db.executeSql(sql, [value]).then(response=>{
	  	return Promise.resolve(response.rows.item(0));
	  });	  
	}

	update(journal: any){
		console.log("U P D A T E");

  	let sql = 'UPDATE journals SET title=?, context=?,  WHERE id=?';
  	return this.db.executeSql(sql, [journal.title, journal.completed, journal.id]);
	}

	delete(journal: any){
		console.log("D E L E T E");

	  let sql = 'DELETE FROM journals WHERE id=?';
	  return this.db.executeSql(sql, [journal.id]);
	}


}
