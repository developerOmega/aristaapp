import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Journal } from '../journal/journal';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { Months } from '../months/months';

import { JournalsService } from '../../providers/journals-service/journals-service';
import { PhotosService } from '../../providers/photos-service/photos-service';

@Component({
	selector: "settings-page",
	templateUrl: 'settings.html',
	providers: [Api, Data]
})

export class Settings{
	
	public valor : any;

	constructor(
		public http: Http,
		public navCtrl: NavController,
		public navParams: NavParams,
		public storage: Storage,
		public platform: Platform,
		public popoverController: PopoverController,
		public viewCtrl: ViewController,
		public alertCtrl: AlertController,
		public journalsService: JournalsService,
    public photosService: PhotosService
	){}

	ionViewDidLoad(){
  	document.getElementById('sub_options').style.display = "none";
  	document.getElementById('closeSession').style.display = "none";
	}

	close() {
    this.viewCtrl.dismiss();
  }

  destroySession(){
    this.storage.set("valid", false);
    this.ionViewDidLoad();   
  }



  buyAlbum(){
  	
  	this.storage.get("valid").then((val) => {
  		this.valor = val;
  		console.log('valid es: ', this.valor);

  		if(this.valor == true){
  			this.buyAlbumAlert(); //Comenzar a subir datos

  			document.getElementById('sub_options').style.display = "none";
  			document.getElementById('closeSession').style.display = "block";	
  		}

  		if(this.valor==false)
  		{ 	      
  	    this.loginAlert(); //AlertController que porfavor inicie sesion o se registre
  	    document.getElementById('sub_options').style.display = "block";
  			document.getElementById('closeSession').style.display = "none";
  		}

	    })
	  	.catch(error =>{
	      console.log("Error buyAlbum: ", error);
	    });
	}

	buyAlbumAlert() {
	  let alert = this.alertCtrl.create({
	    title: 'Confirmar Compra',
	    subTitle: 'Se comenzará a subir tus diarios una vez que confirmes',
	    buttons: [
	      {
	        text: 'Cancelar',
	        role: 'cancel',
	        handler: () => {

	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Comprar',
	        handler: () => {

	          console.log('Buy clicked');
	          this.updateJournals();
	        }
	      }
    	]
	  });
	  alert.present();
	}

	loginAlert() {
	  let alert = this.alertCtrl.create({
	    title: 'Inicia sesión',
	    subTitle: 'Inicia sesión con tu cuenta, en caso de que no tengas una cuenta: regístrate',
	    buttons: [
	      {
	        text: 'OK',
	        handler: () => {
	        	
	          console.log('confirmar logueo');
	        }
	      }
    	]
	  });
	  alert.present();
	}

	updateJournals(){
		console.log("Subiendo datos");

		let journal;
		let photo;

		this.journalsService.index()
    .then(journals => {
      console.log("JOURNALS ",JSON.stringify(journals));
      journal = journals;

      console.log("id", JSON.stringify(journal.id) );

    })
    .catch( error => {
    	console.log("Error index: ");
      console.error( error );
    });

		



    // this.photosService.index(journal.id)
    // .then(photos => {
    //   console.log("PHOTOS ", photos);
    //   photo = photos;
    // })
    // .catch( error => {
    // 	console.log("Error index photos: ");
    //   console.error( error );
    // });


	}



  viewLogin(){
  	this.navCtrl.push( LoginPage );
  }

  viewRegister(){
  	this.navCtrl.push( RegisterPage );
  }

	


}