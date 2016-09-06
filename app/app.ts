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

// 导入服务
import {
  TimerInfoService
} from './pages/services/timerInfo.service';
import {
  TimerSwitcherService
} from './pages/services/timerSwitcher.service';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [TimerInfoService, TimerSwitcherService]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, private timerInfoService: TimerInfoService, private timerSwitcherService: TimerSwitcherService) {
    this.rootPage = BasePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);