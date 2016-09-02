import {Component} from '@angular/core';
import {TimerPage} from '../timer/timer';
import {StatisticsPage} from '../statistics/statistics';
import {SettingPage} from '../setting/setting';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = TimerPage;
    this.tab2Root = StatisticsPage;
    this.tab3Root = SettingPage;
  }
}
