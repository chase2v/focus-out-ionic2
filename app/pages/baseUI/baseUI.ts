import {
  Component
} from '@angular/core';
import {
  TimerPage
} from '../timer/timer.page';
import {
  StatisticsPage
} from '../statistics/statistics';
import {
  SettingPage
} from '../setting/setting';
import {
  DetailCardComponent
} from './detailCard.component';
import {
  AddTimerCardComponent
} from './addTimerCard.component';

@Component({
  templateUrl: 'build/pages/baseUI/baseUI.html',
  directives: [DetailCardComponent, AddTimerCardComponent]
})
export class BasePage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  private showDetailCard = false;
  private showAddTimerCard = false;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = TimerPage;
    this.tab2Root = StatisticsPage;
    this.tab3Root = SettingPage;
  }

  isShowDetailCard(): void {
    this.showDetailCard = !this.showDetailCard;
  }
  isShowAddTimerCard(): void {
    this.showAddTimerCard = !this.showAddTimerCard;
  }
}