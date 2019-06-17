import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController  } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';



@Component({
	selector: 'journal-page',
	templateUrl: 'journal.html',
	providers: [Api, Data]
})


export class Journal{

	public journal :any;
	public month: any;
	public event_date: any = '';
	public title: any = '';
	public content: any = '';
	public user: any;
	public photo: any;
	public journal_id: any;
	public count: number = 0;
	public photos: any = [];

	constructor(
		public http: Http,
		public navCtrl: NavController, 
		public navParams: NavParams,
		public platform: Platform,
		public storage: Storage,
		public apiCtrl: Api,
		public loading: LoadingController,
        public toastCtrl: ToastController,
        public camera: Camera,

	){
	}

	ionViewWillEnter(){
		this.month = this.navParams.get('month');
		console.log(this.month);

		let date = new Date();

		this.event_date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
		console.log(this.event_date);



	}

	getJournalLast(){
		this.apiCtrl.get('journals').then(data =>{
			console.log('JORUNALSGET:', data);
			
			this.journal = data;
		});




	}

	takePhoto(){

		const options: CameraOptions = {
			  quality: 100,
			  sourceType: this.camera.PictureSourceType.CAMERA,
			  correctOrientation:true,
        destinationType: this.camera.DestinationType.DATA_URL,
			  encodingType: this.camera.EncodingType.JPEG,
			  mediaType: this.camera.MediaType.PICTURE,
			  targetWidth: 1000,
			  targetHeight: 1000
		}

		this.camera.getPicture(options).then((imageData) => {	
		 	
		 	this.photos[this.count] = this.photo = 'data:image/jpeg;base64,' + imageData;
		  
		  this.count++;

			this.getJournalLast();
			// var body: any = {
			// 	photo: this.photo,

			// }
		}, 
		(err) => {
		 	console.log("Error: ", err);
		});
	}

	savePhoto(id){
		
		if (this.photo || (this.photo && this.photo.length > 0)) {
      let body: any = {

          src: this.photo,
         	journal_id: id
      
     	};

     	let url = 'journals/'+ id +'/photos';

      this.apiCtrl.post(url, body).then(data => {
					console.log("Take Photo:", data);

          
      });
    }
	}

	saveJournal(){


		var body: any = {
			title: this.title,
			context: this.content,
			event_date: this.event_date,
			month: this.month
		}

		this.apiCtrl.post("journals", body).then(data => {
			console.log("Exito----------------", data);

			this.journal = data;

			this.savePhoto(this.journal.id);
			console.log("ID------------", this.journal.id);
			// this.savePhoto();
			this.navCtrl.pop();
		});


	}


}