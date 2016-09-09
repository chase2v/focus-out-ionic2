import {
	Component,
	ViewChild
} from '@angular/core';

// 导入自定义服务
import {
	StateService
} from './state.service';
import {
	TimerSwitcherService
} from '../services/timerSwitcher.service';
import {
	ShowCardService
} from '../services/showCard.service';


// 导入三个页面
import {
	TimerPage
} from '../timer/timer.page';
import {
	StatisticsPage
} from '../statistics/statistics';
import {
	SettingPage
} from '../setting/setting';

// 导入直属组件
import {
	DetailCardComponent
} from './detailCard.component';
import {
	AddTimerCardComponent
} from './addTimerCard.component';
import {
	CtrlCenterComponent
} from './ctrlCenter.component';

@Component({
	templateUrl: 'build/pages/baseUI/baseUI.html',
	directives: [DetailCardComponent, AddTimerCardComponent, CtrlCenterComponent],
	providers: [StateService, TimerSwitcherService, ShowCardService]
})
export class BasePage {

	private tab1Root: any;
	private tab2Root: any;
	private tab3Root: any;

	@ViewChild('mytab') mytabs;
	@ViewChild('detailCard') detailCard;

	constructor(private stateService: StateService, private timerSwitcherService: TimerSwitcherService, private showCardService: ShowCardService) {
		// this tells the tabs component which Pages
		// should be each tab's root Page
		this.tab1Root = TimerPage;
		this.tab2Root = StatisticsPage;
		this.tab3Root = SettingPage;

		this.showCardService.showCardObservable.subscribe(res => {
			if (res === 'Show card!') {
				this.isShowDetailCard('detail');
			}
		});
	}

	ionViewWillEnter() {
		this.mytabs.select(2);
	}

	// 用来控制卡片的显示和隐藏
	private showDetailCard = false;
	private showAddTimerCard = false;

	// 用来控制 1 控制按钮的图标
	private detailCardIcon = 'arrow-up';

	// 接收控制中心出来的信息，来控制卡片的展示和隐藏
	isShowDetailCard(message: string): void {
		console.log('Run isShowDetailCard!');
		if (message === 'detail') {
			this.showDetailCard = !this.showDetailCard;

			this.detailCardIcon = this.showDetailCard ? 'arrow-down' : 'arrow-up';
		}
		if(!this.showDetailCard) {
			this.detailCard.sendChange();
		}
	}

	// 接收控制中心出来的信息，来控制卡片的展示和隐藏
	isShowAddTimerCard(message: string): void {
		console.log('Run isShowAddTimerCard!');
		if (message === 'adder') {
			this.showAddTimerCard = !this.showAddTimerCard;
		}
	}
}