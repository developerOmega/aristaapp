import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController  } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ShowJournal } from '../show-journal/show-journal';

import { JournalsService } from '../../providers/journals-service/journals-service';
import { PhotosService } from '../../providers/photos-service/photos-service';


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
	public photosSQL: any = [];

	public newJournal: any;

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
    public journalsService: JournalsService,
    public photosService: PhotosService
	){
	}

	ionViewWillEnter(){
		this.month = this.navParams.get('month'); //MES del cuadrito
		console.log(this.month);

		let date = new Date();

		//Fecha en que se creo el journal
		this.event_date = date.getDate() + "-" + (date.getMonth() + 1 ) + "-" + date.getFullYear();
		
		console.log(this.event_date);
	}

	getJournalLast(){
		this.apiCtrl.get('journals').then(data =>{
			console.log('JORUNALSGET:', data);
			
			this.journal = data;
			console.log('this --- JORUNALSGET:', this.journal);

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

			this.getJournalLast(); //Mostar fotos :( aiuda??

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

	saveJournalSQLite(){
		console.log("metodo save journal SQLite");

		var body: any = {
			title: this.title,
			context: this.content,
			event_date: this.event_date,
			create_at: this.event_date,
			update_at: this.event_date,
			month: this.month
		}

		this.journalsService.create(body)
    .then(journals => {
      console.log("Exitoso ----- ", JSON.stringify(journals));

      this.newJournal = journals;
    	// console.log("JOURNAL ALV ", JSON.stringify(this.newJournal));

     	this.savePhotoSQL(this.newJournal.insertId);
    	console.log("ID ", this.newJournal.insertId);

    })
    .catch( error => {
    	console.log("Error create: ", JSON.stringify(error));
      // console.error( error );
    });


    this.navCtrl.pop();
	}


	savePhotoSQL(id){

		for(let i = 0; i < this.photos.length; i++){

			let body: any = {

	      src: this.photos[i],
	      create_at: this.event_date,
				update_at: this.event_date,
	      journal_id: id
	      
	    };

    	console.log("TODOS ALV" , body.src,	body.create_at, body.update_at ,body.journal_id );



	    this.photosService.create(body)
		  .then(photo => {
		  	console.log("Exitoso save photo", JSON.stringify(photo));

			  // this.photosSQL.push(photo);
			})
			.catch( error => {
				console.log("Error create photos: ", JSON.stringify(error));
			      // console.error( error );
			});

		}


	}


	// savePhotoSQL(id){

	// 	console.log("funcion save photo journal", this.photos.length );

	// 	for(let i = 0; i < this.photos.length; i++){
	      
	//       let body: any = {
	//           src: this.photos[i],
	//          	create_at: this.event_date,
	// 					update_at: this.event_date,
	// 					journal_id: id     
	//      	};

	//      	//console.log("Imprimir FFFFFFFF ---",  body.src, body.create_at, body.update_at, body.journal_id)

	//      	this.photosService.create(body)
	//      	.then(photo => {
	//       	console.log("Exitoso save photo", JSON.stringify(photo));
	//       	this.photosSQL.push(photo.src);
	//       	if(i == this.photos.length){
	//       		this.navCtrl.push(ShowJournal, {allPhotos: photo});
	//       	}
	// 	    })
	// 	    .catch( error => {
	// 	    	console.log("Error create photos: ", JSON.stringify(error));
	// 	      // console.error( error );
	// 	    });
	    
	//   }


	// 	console.log("photos sql", this.photosSQL.length);

	//   this.navCtrl.push(ShowJournal, {infoPhotos: this.photosSQL });
	// }


}