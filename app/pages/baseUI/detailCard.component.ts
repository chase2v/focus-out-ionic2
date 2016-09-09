import {
	Component,
	OnInit
} from '@angular/core';

// 导入服务
import {
	StoreService
} from '../services/store.service';
import {
	TimerSwitcherService
} from '../services/timerSwitcher.service';

@Component({
	selector: 'detail-card',
	templateUrl: 'build/pages/baseUI/detailCard.component.html'
})
export class DetailCardComponent implements OnInit {
	constructor(private store: StoreService, private timerSwitcher: TimerSwitcherService) {
		console.log('Run constructor!(DetailCardComponent)');

		this.timerSwitcher.timerSwichterObservable.subscribe(res => {
			this.switchTimer(res);
		});
	}

	private timerInfo = {
		id: 0,
		timeSet: {}
	};

	ngOnInit() {
		let id = this.timerSwitcher.getCurrentTimer();
		this.store.getData(id).then(res => {
			this.timerInfo = res;
		});
	}

	// 切换 TImer 并将其信息显示在卡片上
	switchTimer(id: number): void {
		console.log('Run switchTimer!(DetailCardComponent)')
		this.store.getData(id).then(res => {
			this.timerInfo = res;
		});
	}

	/**
	 * 修改计时器信息
	 */
	private sendSignal = false;
	private isChanging = false;
	setChangeAction(): any {
		if(!this.isChanging) {
			this.sendSignal = false;
			this.isChanging = true;
			new Promise((resolve,reject) => {
				setInterval(()=>{
					if(this.sendSignal) {
						resolve();
						this.sendSignal = false;
						this.isChanging = false;
					}
				},2000);
			}).then(res => {
				this.store.setData(this.timerInfo.id, this.timerInfo);
			});
		}
	}
	sendChange(): void {
		this.sendSignal = true;
	}
}