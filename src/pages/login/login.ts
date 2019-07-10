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
	public full_name: any;

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
		console.log("Estamos en el Login");
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

				// this.storage.set("bearer", auth_token).then((valid) => {
				// 	this.storage.set("valid",true);

				// 	loader.dismiss();
				// 	this.navCtrl.setRoot(Months);
				// });

				this.storage.set("bearer", auth_token);
        this.storage.set("valid", true);
        loader.dismiss();
        this.navCtrl.setRoot(Months);
                
			}, error => {
        this.storage.set("valid", false);          

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

      this.showUser = true; 
      this.user = data;

      this.saveLoginFb(this.user);
    })
    .catch(error =>{
      console.error( error );
    });
  }

  saveLoginFb(data){

    this.full_name = data.first_name + ' ' + data.last_name;


    const formData = new FormData();

  	formData.append("user[email]", data.email);
  	formData.append("user[password]", "");
    formData.append("user[password_confirmation]", "");
    formData.append("user[full_name]", this.full_name);

    let url = this.apiCtrl.socket + 'users';

    var auth_token: any; 
    var user: any;
    let loader = this.loading.create({});

    loader.present().then(() => {
          this.http.post(url, formData ).subscribe( data => {
            
            console.log("CREDENCIALES CORRECTAS", data);

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

          console.log("INCORRECTO ", error)
            
            loader.dismiss();

            console.log('Bearer query failed');
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
