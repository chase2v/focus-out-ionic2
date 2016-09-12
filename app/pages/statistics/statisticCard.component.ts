import {
	Component,
	OnInit,
	Input,
	ViewChild,
	EventEmitter,
	Output,
	OnChanges
} from '@angular/core';

// import子组件
import {
	StatisticCardCanvasComponent
} from './statisticCard.canvas.component';

import {
	StoreService
} from '../services/store.service';

@Component({
	selector: 'statistic-card',
	templateUrl: 'build/pages/statistics/statisticCard.component.html',
	directives: [StatisticCardCanvasComponent]
})
export class StatisticCardComponent implements OnInit, OnChanges {
	constructor(private store: StoreService) {}

	ngOnInit() {

	}

	ngOnChanges() {
		if (this.data.statistics) {
			this.handleStatistics();
		}
		this.statisticType = 'Table';
	}

	@Input() data;

	private statistics: Array<{}>;

	// 当前显示统计类型
	private statisticType = 'Table';


	@Output() onSwitchCard = new EventEmitter < number > ();
	// 切换当前显示卡片
	switchCard(change: number): void {
		this.onSwitchCard.emit(change);
	}

	// 处理统计数据
	handleStatistics(): void {
		let date = new Date();
		date = new Date(date.toDateString());
		let arrDate = [],
			arrAmount = [],
			arrTarget = [],
			arrNewData = [];
		this.data.statistics.forEach(v => {
			arrDate.push(new Date(v.date));
			arrAmount.push(v.amount);
			arrTarget.push(v.target);
		});

		let j = 0,
			dateValue = date.valueOf();
		for (let i = 0; i < 30; i++) {
			let time = dateValue - (3600*1000*24*i);
			if(time === arrDate[j].valueOf()) {
				arrNewData.push({
					date: arrDate[j],
					amount: arrAmount[j],
					target: arrTarget[j]
				});
				j++;
			} else {
				arrNewData.push({
					date: new Date(time),
					amount: 0,
					target: arrTarget[j]
				});
			}
		}
		this.statistics = arrNewData;
	}
}