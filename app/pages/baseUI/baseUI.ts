import {
	Component,
	ViewChild
} from '@angular/core';

// 导入自定义服务
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
})
export class BasePage {

	private tab1Root: any;
	private tab2Root: any;
	private tab3Root: any;

	@ViewChild('mytab') mytabs;
	@ViewChild('detailCard') detailCard;
	@ViewChild('ctrl') ctrlCenter;
	@ViewChild('addCard') addCard;

	constructor(private showCardService: ShowCardService) {
		// this tells the tabs component which Pages
		// should be each tab's root Page
		this.tab1Root = TimerPage;
		this.tab2Root = StatisticsPage;
		this.tab3Root = SettingPage;

		this.showCardService.showCardObservable.subscribe(res => {
			if (res === 'detail') {
				this.isShowDetailCard('detail');
			} else {
				this.isShowAddTimerCard('adder');
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

	private addCardIcon = 'add';

	// 接收控制中心出来的信息，来控制卡片的展示和隐藏
	isShowDetailCard(message ? : string): void {
		console.log('Run isShowDetailCard!');
		this.showDetailCard = !this.showDetailCard;

		this.detailCardIcon = this.showDetailCard ? 'arrow-down' : 'arrow-up';

		if (!this.showDetailCard && message.indexOf('close') === -1) {
			console.log('detailSendChange');
			this.detailCard.sendChange();
			this.ctrlCenter.isDetailCardChanging = false;
		} else if (!this.showDetailCard && message.indexOf('close') !== -1) {
			this.ctrlCenter.isDetailCardChanging = false;
		}
	}

	/**
	 * 修改计时器信息时，改变图标
	 */
	isDetailCardChanging() {
		this.detailCardIcon = 'checkmark';
		this.ctrlCenter.isDetailCardChanging = true;
	}

	// 接收控制中心出来的信息，来控制卡片的展示和隐藏
	isShowAddTimerCard(message ? : string): void {
		console.log('Run isShowAddTimerCard!');
		this.showAddTimerCard = !this.showAddTimerCard;
		this.addCardIcon = this.showAddTimerCard ? 'close' : 'add';

		if (!this.showAddTimerCard && message.indexOf('close') === -1) {
			console.log('addSendChange');
			this.addCard.sendChange();
			this.ctrlCenter.isAddCardChanging = false;
		} else if (!this.showAddTimerCard && message.indexOf('close') !== -1) {
			this.ctrlCenter.isAddCardChanging = false;
		}
	}

	isAddCardChanging() {
		this.addCardIcon = 'checkmark';
		this.ctrlCenter.isAddCardChanging = true;
	}
}