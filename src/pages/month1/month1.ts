import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Journal } from '../journal/journal';

// import { JournalsService } from '../../providers/journals-service/journals-service';

@Component({
	selector: 'month1-page',
	templateUrl: 'month1.html'
}) 

export class Month1 {

	//journals: any[] = [];

	constructor(
		public navCtrl: NavController,
		public storage: Storage,
		public platform: Platform
		// public journalsService: JournalsService
	){}

	ionViewWillEnter(){
		// this.getAllJournals();
	}

	journalView(){

		this.navCtrl.push(Journal, {month: 1});
	}

	// getAllJournals(){
 //    this.journalsService.index()
 //    .then(journals => {
 //      console.log(journals);
 //      this.journals = journals;
 //    })
 //    .catch( error => {
 //    	console.log("Error index: ");
 //      console.error( error );
 //    });
 //  }


}