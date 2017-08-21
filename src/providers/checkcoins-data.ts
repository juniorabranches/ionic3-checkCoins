import { CacheService } from 'ionic-cache/ionic-cache';
import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CheckCoinsData {

  private baseUrlV1 = "https://braziliex.com/api/v1/public/";

  constructor(public http: Http, public jsonp: Jsonp, public cache: CacheService) { }

  getCurrencies(){
    return new Promise(resolve => {
        this.http.get(`${this.baseUrlV1}currencies`)
            .subscribe(res => resolve(res.json()));
    });
  }

  getResume(){
    return new Promise(resolve => {
        this.http.get(`${this.baseUrlV1}ticker`)
            .subscribe(res => resolve(res.json()));
    });
  }


}
