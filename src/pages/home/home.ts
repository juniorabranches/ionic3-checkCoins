import { AlertService } from '../../providers/util/alert.service';
import { AuthData } from '../../providers/auth-data';
import { LoadingService } from '../../providers/util/loading.service';
import { CheckCoinsFirebaseData } from '../../providers/checkcoins-firebase-data';
import { CheckCoinsData } from '../../providers/checkcoins-data';
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { App, NavController, Platform, Slides, IonicPage, Content, Searchbar } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mycontent') content: Content;
  @ViewChild(Slides) categories : Slides;

  listSearch: string = '';
  events: any        = [];
  view : string      = "coins";
  dataWasChanged     = false;

  topics = [{
    name: 'Real',
    color: '#6064FC'
  }, {
    name: 'Bitcoin',
    color: '#99D6D9'
  }, {
    name: 'Litecoin',
    color: '#A5A3DD'
  },{
    name: 'Ethereum',
    color: '#4F99F0'
  }, {
    name: 'Monero',
    color: '#f8ab02'
  }, {
    name: 'Dash',
    color: '#ff1616'
  }, {
    name: 'MartexCoin',
    color: '#16ff89'
  }, {
    name: 'Prosper',
    color: '#b016ff'
  },{
    name: 'SingularDTV',
    color: '#FF640C'
  }];

  selectedTopics = [];

  constructor(public app: App, public navCtrl: NavController,
              public checkcoinsProvider: CheckCoinsData, public firebaseData: CheckCoinsFirebaseData,
              public authData: AuthData, public loadingCtrl: LoadingService,
              public alertCtrl: AlertService, public platform: Platform,
              public geolocation: Geolocation, public renderer: Renderer) {
  }

  ngOnInit(){
    window.addEventListener('resize', () => {
      let width                     = this.platform.width();
      let slidesPerView             = Math.floor(width / 125);
      this.categories.slidesPerView = slidesPerView;
      this.categories.update();
    }, false);
  }

  addTopic(topic){
    if(this.selectedTopics.indexOf(topic) === -1){
      this.selectedTopics.push(topic);
      this.dataWasChanged = true;
      this.loadData();
    }
  }

  deleteTopic(topic) {
    this.selectedTopics.splice(this.selectedTopics.indexOf(topic),1);
    this.dataWasChanged = true;
    this.loadData();
  }

  loadData() {
    if(this.view == 'coins'){
      this.loadEvents();
    }
  }

  loadEvents() {
    this.loadingCtrl.present();
    let topics = this.selectedTopics.join(' ');
    this.loadingCtrl.dismiss().then(() => {
    });
  }

  // hideSearchBar(){
    // if(this.search){
    //   let opacity = 1 - (this.content.scrollTop/115);
    //   this.renderer.setElementStyle(this.searchbar.nativeElement, 'margin-top', (50 * opacity * -1) + 'px');
    //   if(opacity <= 0){
    //     opacity = 0;
    //   }
    //   // this.renderer.setElementStyle(this.searchbar.nativeElement, 'opacity', opacity.toString());
    // }
  // }
}
