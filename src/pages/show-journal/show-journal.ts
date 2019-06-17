import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Journal } from '../journal/journal';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';

@Component({
	selector: 'show-journal-page',
	templateUrl: 'show-journal.html',
	providers: [Api, Data]
})

export class ShowJournal{

	public journals: any;
	public title: any;
	public content: any;

	constructor(
		public http: Http,
		public navCtrl: NavController,
		public navParams: NavParams,
		public storage: Storage,
		public platform: Platform,
		public apiCtrl: Api
	){}


	ionViewWillEnter(){
		this.journals = this.navParams.get('journals');
		this.title = this.journals.title;
		this.content = this.journals.context;

		console.log("SHOW" ,this.journals.title);


	}





}