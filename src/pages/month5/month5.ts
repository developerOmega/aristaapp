import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Journal } from '../journal/journal';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';
import { ShowJournal } from '../show-journal/show-journal';

import { JournalsService } from '../../providers/journals-service/journals-service';


@Component({
	selector: 'month5-page',
	templateUrl: 'month5.html',
	providers: [Api, Data]
}) 

export class Month5 {

	public journals: any;

	journals_sql: any[] = [];

	constructor(
		public http: Http,
		public navCtrl: NavController,
		public storage: Storage,
		public platform: Platform,
		public apiCtrl: Api,
		public journalsService: JournalsService
	){}

	ionViewWillEnter(){

		this.getAllJournals();
		
		this.apiCtrl.get('journals/').then(data => {
			console.log("asdasd", data);
			this.journals = data;
		});

	}

	showJournal(journal){

		let url_id = 'journals/' + journal.id; 
		console.log(url_id);

		this.apiCtrl.get(url_id).then(data => {
			console.log("asdasd", data);
			
			this.navCtrl.push(ShowJournal, {journals: data});

		});
	}

	journalView(){

		this.navCtrl.push(Journal, {month: 5});
	}

//---------------------SQLite -----------------//
	getAllJournals(){
    this.journalsService.index()
    .then(journals => {
      console.log(journals);
      this.journals_sql = journals;
    })
    .catch( error => {
    	console.log("Error index: ");
      console.error( error );
    });
  }


}