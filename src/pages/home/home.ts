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
  @ViewChild(Slides) currencies : Slides;

  listSearch: string = '';
  currencieDetail: any        = [];
  view : string      = "coins";
  dataWasChanged     = false;
  curCount        = 0;

  allCurrencies = [{
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

  selectedCurrencies = [];

  constructor(public app: App, public navCtrl: NavController,
              public checkcoinsProvider: CheckCoinsData, public firebaseData: CheckCoinsFirebaseData,
              public authData: AuthData, public loadingCtrl: LoadingService,
              public alertCtrl: AlertService, public platform: Platform,
              public geolocation: Geolocation, public renderer: Renderer) {
      this.loadCurDetail();
  }

  ngOnInit(){
    window.addEventListener('resize', () => {
      let width                     = this.platform.width();
      let slidesPerView             = Math.floor(width / 125);
      this.currencies.slidesPerView = slidesPerView;
      this.currencies.update();
    }, false);
  }

  addTopic(topic){
    if(this.selectedCurrencies.indexOf(topic) === -1){
      this.selectedCurrencies.push(topic);
      this.dataWasChanged = true;
    }
  }

  deleteTopic(topic) {
    this.selectedCurrencies.splice(this.selectedCurrencies.indexOf(topic),1);
    this.dataWasChanged = true;
  }

  loadCurDetail() {
    this.loadingCtrl.present();
    this.currencieDetail = [];
    let topics = this.selectedCurrencies.join(' ');
    this.checkcoinsProvider.getCurrencies().then(curData => {
      this.loadingCtrl.dismiss().then(() => {
        for (const key of Object.keys(curData)) {
          this.currencieDetail.push({ MinWithdrawal: curData[key].MinWithdrawal,
                                      active: curData[key].active,
                                      decimal: curData[key].decimal,
                                      dev_active: curData[key].dev_active,
                                      minAmountTrade:curData[key].active,
                                      minConf: curData[key].active,
                                      minDeposit: curData[key].active,
                                      name: curData[key].name,
                                      txDepositFee:curData[key].active,
                                      txDepositPercentageFee: curData[key].active,
                                      txWithdrawalFee: curData[key].active,
                                      txWithdrawalPercentageFee:curData[key].active,
                                      under_maintenance:curData[key].active,
                                      sigle: curData[key].name == 'Real' ? 'brl' :
                                             curData[key].name == 'Bitcoin' ? 'btc' :
                                             curData[key].name == 'Litecoin' ? 'ltc' :
                                             curData[key].name == 'Ethereum' ? 'eth' :
                                             curData[key].name == 'Monero' ? 'xmr' :
                                             curData[key].name == 'Dash' ? 'dash' :
                                             curData[key].name == 'MartexCoin' ? 'mxt' :
                                             curData[key].name == 'Prosper' ? 'Prosper' :
                                             curData[key].name == 'SingularDTV' ? 'sngls' :  '',
                                             
                                      color: curData[key].name == 'Real' ? '#6064FC' :
                                             curData[key].name == 'Bitcoin' ? '#99D6D9' :
                                             curData[key].name == 'Litecoin' ? '#A5A3DD' :
                                             curData[key].name == 'Ethereum' ? '#4F99F0' :
                                             curData[key].name == 'Monero' ? '#f8ab02' :
                                             curData[key].name == 'Dash' ? '#ff1616' :
                                             curData[key].name == 'MartexCoin' ? '#16ff89' :
                                             curData[key].name == 'Prosper' ? '#b016ff' :
                                             curData[key].name == 'SingularDTV' ? '#FF640C' :  '#6064FC'

                          });
           this.curCount++;
          }
        });
        this.allCurrencies
        this.dataWasChanged = false;
      });

  }

}
