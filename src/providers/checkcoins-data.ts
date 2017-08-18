import { CacheService } from 'ionic-cache/ionic-cache';
import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CheckCoinsData {

  private baseUrlV1 = "https://braziliex.com/api/v1/public/";

  constructor(public http: Http, public jsonp: Jsonp, public cache: CacheService) { }

  get(endpoint: string, params?: any, cacheKey?: string, jsonp: boolean = true, options?: RequestOptions) {
    options = new RequestOptions();

    // Support easy query params for GET requests
    let p = new URLSearchParams();
    if (params) {
      for(let k in params) {
        p.set(k, params[k]);
      }

    }

    if(jsonp){
      // For jsonp calls so we don't have cors issues
      p.set('callback', 'JSONP_CALLBACK');
    }

    // Set the search field if we have params and don't already have
    // a search field set in options.
    options.search = !options.search && p || options.search;
    let request = jsonp ? this.jsonp.request(endpoint, options).map(res => res.json())
                 : this.http.get("https://crossorigin.me/" + endpoint, options).map(res => res.json());
    return this.cache.loadFromObservable(cacheKey, request);
  }

  getCurrencies(){
    let endpoint = `currencies`;
    return this.get(this.baseUrlV1 + endpoint, null, endpoint, false);
  }

}
