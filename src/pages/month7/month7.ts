import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Journal } from '../journal/journal';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';

@Component({
	selector: 'month7-page',
	templateUrl: 'month7.html',
	providers: [Api, Data]
}) 

export class Month7 {

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

	journalView(){

		this.navCtrl.push(Journal, {month: 7});
	}

}