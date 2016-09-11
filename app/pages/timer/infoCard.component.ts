import {
	Component,
	ViewChild,
	OnInit
} from '@angular/core';

// 导入服务
import {
	TimerSwitcherService
} from '../services/timerSwitcher.service';
import {
	StoreService
} from '../services/store.service';
import {
	ShowCardService
} from '../services/showCard.service';

@Component({
	selector: 'info-card',
	templateUrl: 'build/pages/timer/infoCard.component.html'
})
export class InfoCardComponent implements OnInit {
	// 用于获取自己的 dom
	@ViewChild('myself') myself;

	constructor(private timerSwitcher: TimerSwitcherService, private store: StoreService, private showCardService: ShowCardService) {
		console.log('Run constructor!');

		this.timerSwitcher.timerSwichterObservable.subscribe(res => {
			this.switchTimer(res);
		});

		this.store.getData(0,['name','target']).then(res => {
			this.info.name = res.name;
			this.info.target = Array(res.target);
		});
	}

	ngOnInit() {}

	// 卡片信息
	private info = {
		name: '',
		target: []
	};

	// 调整卡片尺寸，来适应不同尺寸的设备
	resize(contentHeight: number): void {
		console.log('Run resize!');

		let myStyle = this.myself.nativeElement.style;
		myStyle.height = (contentHeight / 4 - 60) + 'px';
	}

	// 切换 TImer 并将其信息显示在卡片上
	switchTimer(id: number): void {
		console.log('Run switchTimer!(InfoCardComponent)')
		this.store.getData(id).then(res => {
			this.info.name = res.name;
			this.info.target = Array(res.target);
		});
	}

	// 点击展示详细信息卡片
	showDetailCard(): void {
		this.showCardService.showCard('detail');
	}
}