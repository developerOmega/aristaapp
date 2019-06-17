import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Journal } from '../journal/journal';


@Component({
	selector: 'month4-page',
	templateUrl: 'month4.html'
}) 

export class Month4 {

	constructor(
		public navCtrl: NavController,
		public storage: Storage,
		public platform: Platform

	){}

	ionViewWillEnter(){

	}

	journalView(){

		this.navCtrl.push(Journal, {month: 4});
	}


}