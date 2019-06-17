import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Months } from '../months/months';

@Component({
	selector: 'login-page',
	templateUrl: 'login.html',
	providers: [Api, Data]
})

export class LoginPage {

	public email: any;
	public password: any;

	constructor(
		public http: Http,
		public navCtrl: NavController,
		public apiCtrl: Api,
		public storage: Storage,
		public platform: Platform,
		public loading: LoadingController
	){

	}

	ionViewWillEnter(){
	}

	logIn(){

		const formData = new FormData();
		formData.append("email", this.email);
		formData.append("password", this.password);
		


		let url = this.apiCtrl.socket + 'authenticate/';

		console.log(url);

		var auth_token: any;
		var user: any;
		let loader = this.loading.create({});


		loader.present().then(() => {
			this.http.post(url, formData).subscribe( data => {

				console.log("Credenciales correctas", data);

				user = data;

				user = user._body;

				user = JSON.parse(user);

				auth_token = user.auth_token;

				this.storage.set("current_user", user);

				this.storage.set("bearer", auth_token).then((valid) => {
					this.storage.set("valid",true);

					loader.dismiss();
					this.navCtrl.setRoot(Months);
				});
		
			}, error => {

				console.log("Error");
				loader.dismiss();

			});
		});
	}

	


	viewMonths(){
		this.navCtrl.push(Months);
	}

	Registration(){
		this.navCtrl.push(RegisterPage);
	}


}
