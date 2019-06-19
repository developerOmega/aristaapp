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
import { Facebook } from '@ionic-native/facebook';

@Component({
	selector: 'login-page',
	templateUrl: 'login.html',
	providers: [Api, Data]
})

export class LoginPage {

	public email: any;
	public password: any;

	public user: any = {};
  public showUser: boolean = false;

	constructor(
		public http: Http,
		public navCtrl: NavController,
		public apiCtrl: Api,
		public storage: Storage,
		public platform: Platform,
		public loading: LoadingController,
		public facebook: Facebook
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

	loginFacebook(){
    this.facebook.login(['public_profile', 'email'])
    .then(rta => {
      console.log(rta.status);
      if(rta.status == 'connected'){
        this.getInfo();
      };
    })
    .catch(error =>{
      console.error( error );
    });
  }

  getInfo(){
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      console.log(data);
      this.showUser = true; 
      this.user = data;
    })
    .catch(error =>{
      console.error( error );
    });
  }


	


	viewMonths(){
		this.navCtrl.push(Months);
	}

	Registration(){
		this.navCtrl.push(RegisterPage);
	}


}
