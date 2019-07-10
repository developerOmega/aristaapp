import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController  } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Data } from '../../providers/data';
import { Months } from '../months/months';


@Component({
  selector: 'register-page',
  templateUrl: 'register.html',
  providers: [Api, Data]
})

export class RegisterPage{

    public email: any = '';
    public first_name: any = '';
    public last_name: any = '';
    public password: any = '';
    public password_confirmation: any = '';
    public full_name: any = '';
    public promotions: any = false;
    public terms: any = false;
    public privacy: any = false;

    constructor(
    public http: Http, 
        public navCtrl: NavController, 
        public apiCtrl: Api, 
        public storage: Storage,
        public platform: Platform, 
        public loading: LoadingController,
        public toastCtrl: ToastController
    ){
    }

    ionViewWillEnter() {
      
      }

      SaveRegister() {


        this.full_name = this.first_name + ' ' + this.last_name;

        const formData = new FormData();
        formData.append("user[email]", this.email);
        formData.append("user[password]", this.password);
        formData.append("user[password_confirmation]", this.password_confirmation);
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

          console.log("INCORRECTO ", JSON.stringify(error))
            
            loader.dismiss();

            console.log('Bearer query failed');
          });
        });

      }

}