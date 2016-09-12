import {
  Component
} from '@angular/core';
import {
  Platform,
  ionicBootstrap
} from 'ionic-angular';
import {
  StatusBar
} from 'ionic-native';

// 导入根组件
import {
  BasePage
} from './pages/baseUI/baseUI';

// 导入数据服务
import {
  StoreService
} from './pages/services/store.service';
import {
  StateService
} from './pages/baseUI/state.service';
import {
  TimerSwitcherService
} from './pages/services/timerSwitcher.service';
import {
  ShowCardService
} from './pages/services/showCard.service';
import {
  RecorderService
} from './pages/services/recorder.service';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [StoreService,StateService, TimerSwitcherService, ShowCardService, RecorderService]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, private store: StoreService) {
    this.rootPage = BasePage;

    this.store.init();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);