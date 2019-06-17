import { Component, ElementRef, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage'; 

import 'rxjs/add/operator/map';

@Injectable()
export class Api {
  public data: any;
  public credentials: any;
  public socket: any;
  constructor(
    public http: HttpClient, 
    private el: ElementRef, 
    public navCtrl: NavController, 
    public storage: Storage, 

  ) {
    //NOTAS DEL PROGRAMADOR: ESTA CAMBIALA DEPENDIENDO DE SI QUIERES USAR LOCAL O NRUTAS
    this.socket = "https://floating-gorge-28584.herokuapp.com/api/v1/";
    // this.socket = "http://localhost:3000/api/v1/";  
  }

  get(url) {
    url = this.socket + url; 
    return new Promise (resolve => {
      this.storage.get("bearer").then((credentials) => {
        console.log("bearer");
        console.log(credentials);
        this.credentials = credentials; 
        console.log(this.credentials);

        let api_headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.credentials);
        api_headers.set('Access-Control-Allow-Origin', '*');
        

        this.http.get(url,  {headers: api_headers} ).subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.storage.set("valid", true);

        }, error => {

          
          this.storage.set("valid", false);

          console.log('Get to url: ' + url + ' failed');
          console.log("error");
          console.log(error);   
        });
      });
    });
  }


  
  post(url, data) {
    url = this.socket + url; 
    return new Promise (resolve => {
      this.storage.get("bearer").then((credentials) => {
        console.log("bearer");
        console.log(credentials);
        this.credentials = credentials; 
        console.log(this.credentials);
        let params = new HttpParams();
        let api_headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.credentials);
        console.log("headers");
        console.log(api_headers);
        this.http.post(url, data, {headers: api_headers}).subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.storage.set("valid", true);

        }, error => {
          this.storage.set("valid", false);

          console.log('Post to url: ' + url + ' failed');
          console.log("error");
          console.log(error);
          console.log(error.status);  
        });
      });
    });
  }

 
}
