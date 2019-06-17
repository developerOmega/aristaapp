import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Journal } from '../journal/journal';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';

import { ShowJournal } from '../show-journal/show-journal';


@Component({
	selector: 'month5-page',
	templateUrl: 'month5.html',
	providers: [Api, Data]
}) 

export class Month5 {

	public journals: any;

	constructor(
		public http: Http,
		public navCtrl: NavController,
		public storage: Storage,
		public platform: Platform,
		public apiCtrl: Api

	){}

	ionViewWillEnter(){

		// let url = this.apiCtrl.socket + 'journals/';
		// console.log(url);

		
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


}