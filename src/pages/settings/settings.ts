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
	public journal: any;
	public photo: any;
	public journal_parameter: any

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
    	public photosService: PhotosService,
    	public apiCtrl: Api 
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
		console.log("Subiendo datos journals");

		this.journalsService.index()
	    .then(journals => {
	      console.log("JOURNALS ",JSON.stringify(journals));
	      this.journal = journals;

	      console.log("INDEX", JSON.stringify(this.journal) );
	      console.log("NUMERO", this.journal.length );

	      for (let i = 0; i < this.journal.length; i++) {
	      	console.log("ID POR JOURNAL", this.journal[i].id );

	      	let body: any = {
	      		title: this.journal[i].title,
	      		month: this.journal[i].month,
	      		context: this.journal[i].context,
	      		event_date: this.journal[i].event_date,
	      	};

	      	this.apiCtrl.post('journals', body).then(data => {

	      		console.log("----EXITO -- JOURNALS ----");
	      		console.log("DATA JOURNALS -- ", JSON.stringify(data));

	      		this.journal_parameter = data;

	        	this.updatePhotos(this.journal[i]);




	      	}).catch(error => {

	      		console.log("Error JOURNAL: ", error);

	      	});




	      	
	      }

	    })
	    .catch( error => {
	    	console.log("Error index: ");
	      console.error( error );
	    });
	}

	updatePhotos(journal){

		console.log("Subiendo datos de fotos");



		this.photosService.index(journal.id).then(photos => {
			//console.log("PHOTOS: ", JSON.stringify(photos));
			this.photo = photos;

			console.log("NUMERO DE FOTOS POR JORUNAL, ", this.photo.length);

			for (let i = 0; i < this.photo.length; i++) {
				console.log("ID DE PHOTO: ", this.photo[i].id);

				let body: any = {
					src: this.photo[i].src,
					journal_id: this.journal_parameter.id
				}

				let url = 'journals/' + this.journal_parameter.id + '/photos'; 

				this.apiCtrl.post(url, body).then(data => {
					console.log("----- EXITO -- PHOTOS -----");
					console.log("DATA PHOTOS -- ", data);
				}).catch(error => {
					console.log("Error PHOTO: ", JSON.stringify(error));
				});

			}
		}).catch(error => {
			console.log("Error index photos: ");
			console.error(JSON.stringify(error));
		});
	}




  viewLogin(){
  	this.navCtrl.push( LoginPage );
  }

  viewRegister(){
  	this.navCtrl.push( RegisterPage );
  }

	


}