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
	selector: 'month2-page',
	templateUrl: 'month2.html',
	providers: [Api, Data]
}) 

export class Month2 {

	journals_sql: any[] = [];

	constructor(
		public navCtrl: NavController,
		public storage: Storage,
		public platform: Platform,
		public apiCtrl: Api,
		public journalsService: JournalsService
	){}

	ionViewDidLoad() {
   this.getAllJournals();
  }

	ionViewWillEnter(){
		this.getAllJournals();
	}

	journalView(){

		this.navCtrl.push(Journal, {month: 2});
	}

	getAllJournals(){
    this.journalsService.index()
    .then(journals => {
      console.log("JOURNALS ",journals);
      this.journals_sql = journals;
    })
    .catch( error => {
    	console.log("Error index: ");
      console.error( error );
    });
  }

  showJournalSQL(journal){
  	this.journalsService.show(journal.id)
  	.then(journal => {
      console.log("JOURNAL ",journal);
      
      this.navCtrl.push(ShowJournal, {infoJournal: journal});
    })
    .catch( error => {
    	console.log("Error index: ");
      console.error( error );
    });
	}


}