import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Month1 } from '../month1/month1';
import { Month2 } from '../month2/month2';
import { Month3 } from '../month3/month3';
import { Month4 } from '../month4/month4';
import { Month5 } from '../month5/month5';
import { Month6 } from '../month6/month6';
import { Month7 } from '../month7/month7';
import { Month8 } from '../month8/month8';
import { Month9 } from '../month9/month9';
import { Settings } from '../settings/settings';

import { JournalsService } from '../../providers/journals-service/journals-service';

@Component({
	selector: 'months-page',
	templateUrl: 'months.html'
})

export class Months{
	public auth : any;
	public usuario: any;

	constructor(
		public http: Http,
		public navCtrl: NavController,
		public storage: Storage,
		public platform: Platform,
		public popoverController: PopoverController
		

	){
			this.auth = this.storage.get("bearer");
	}

	ionViewWillEnter(){
		console.log("token", this.auth);
		console.log("valid", this.storage.get("valid"));
	}

	viewMonthOne(){
		this.navCtrl.push(Month1);
	}

	viewMonthTwo(){
		this.navCtrl.push(Month2);
	}

	viewMonthThree(){

		this.navCtrl.push(Month3);
	}

	viewMonthFour(){
		this.navCtrl.push(Month4);

	}

	viewMonthFive(){
		this.navCtrl.push(Month5);
	}

	viewMonthSix(){
		this.navCtrl.push(Month6);
	}

	viewMonthSeventh(){
		this.navCtrl.push(Month7);
	}

	viewMonthEigth(){
		this.navCtrl.push(Month8);
	}

	viewMonthNine(){
		this.navCtrl.push(Month9);
	}

	// viewSettings(){
	// 	this.navCtrl.push(Settings);
	// }

	presentPopover(myEvent) {
	    let popover = this.popoverController.create(Settings);
	    popover.present({
	      ev: myEvent
	    });
	}



}