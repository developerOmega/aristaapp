import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Journal } from '../journal/journal';
import { Data } from '../../providers/data';
import { Api } from '../../providers/api';

import { PhotosService } from '../../providers/photos-service/photos-service';


@Component({
	selector: 'show-journal-page',
	templateUrl: 'show-journal.html',
	providers: [Api, Data]
})

export class ShowJournal{

	public journals: any;
	public title: any;
	public content: any;
	public id: any;
	public photos : any = [];
	public allphotos: any;
	public idphoto: any;

	constructor(
		public http: Http,
		public navCtrl: NavController,
		public navParams: NavParams,
		public storage: Storage,
		public platform: Platform,
		public apiCtrl: Api,
		public photosService: PhotosService
	){}


	ionViewWillEnter(){
		this.journals = this.navParams.get('infoJournal');
		//this.photos = this.navParams.get('infoPhotos');
		//this.allphotos = this.navParams.get('allPhotos');
		
		this.id = this.journals.id;
		this.title = this.journals.title;
		this.content = this.journals.context;

		



		this.getAllPhotos();
	}

	getAllPhotos(){
    this.photosService.index(this.id)
    .then(photos => {
      console.log("PHOTOS ", photos);
      this.photos = photos;
    })
    .catch( error => {
    	console.log("Error index photos: ");
      console.error( error );
    });
  }


}