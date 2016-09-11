import {
	Component,
	OnInit,
	Output,
	EventEmitter
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
	@Output() onDetailCardChanging = new EventEmitter < string > ();
	private sendSignal = false;
	private isChanging = false;
	setChangeAction(): any {
		if (!this.isChanging) {
			this.sendSignal = false;
			this.isChanging = true;
			this.onDetailCardChanging.emit("changing");
			new Promise((resolve, reject) => {
				let i = 0;
				let interval = setInterval(() => {
					if (this.sendSignal) {
						resolve();
						clearInterval(interval);
						this.sendSignal = false;
						this.isChanging = false;
					}
					i++;
					console.log(i);
					if(i===60) {
						clearInterval(interval);
						reject('被拒绝了');	
					}
				}, 2000);
			}).then(res => {
				this.store.setData(this.timerInfo.id, this.timerInfo);
			}).catch(err=>console.log(err));
		}
	}
	sendChange(): void {
		this.sendSignal = true;
	}

	/**
	 * 处理滑动时间
	 * @param {[type]} e 事件对象
	 */
	handleSwipe(e) {
		console.log(e.direction);
		if (e.direction === 2) {
			this.timerSwitcher.switchTimer(1);
		} else if (e.direction === 4) {
			this.timerSwitcher.switchTimer(-1);
		}
	}
}