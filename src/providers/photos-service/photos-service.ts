import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite'; //for ionic v.4

@Injectable()
export class PhotosService {

	db: SQLiteObject = null;

  constructor(public http: HttpClient) {
    console.log('Hello PhotosService Provider');
  }

	setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
    console.log("setDatabase");
  } 

  createTable(){
  	console.log("Create TABLE photos");

	  let sql = 'CREATE TABLE IF NOT EXISTS photos(id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT, created_at TEXT, update_at TEXT, journal_id INTEGER, FOREIGN KEY (journal_id) REFERENCES journals(id));';
	  
	  return this.db.executeSql(sql, []);
  }

  index(id: any){
  	console.log("I N D E X - - - P H O T O S");

	  let sql = 'SELECT * FROM photos WHERE journal_id = ?;';
	  return this.db.executeSql(sql, [id])
	  .then(response => {
	    let photosIndex = [];
	    for (let index = 0; index < response.rows.length; index++) {
	    	
	      photosIndex.push( response.rows.item(index) );
	    }
	    return Promise.resolve( photosIndex );
	  })
	  .catch(error => Promise.reject(error));
	}

	create(photo: any){
		console.log("C R E A T E - - - P H O T O S");

	  let sql = 'INSERT INTO photos(src, created_at, update_at, journal_id) VALUES(?,?,?,?)';
	  return this.db.executeSql(sql, [photo.src, photo.created_at, photo.update_at, photo.journal_id]);
	}

	show(value: any) {
		console.log("S H O W - - - P H O T O S");

	  let sql = 'SELECT * from photos WHERE id = ?';
	  return this.db.executeSql(sql, [value]).then(response=>{
	  	return Promise.resolve(response.rows.item(0));
	  });	  
	}

	delete(photo: any){
		console.log("D E L E T E - - - P H O T O S");

	  let sql = 'DELETE FROM journals WHERE id=?';
	  return this.db.executeSql(sql, [photo.id]);
	}

}
