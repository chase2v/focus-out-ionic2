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

@Component({
	selector: 'statistic-card',
	templateUrl: 'build/pages/statistics/statisticCard.component.html',
	directives: [StatisticCardCanvasComponent]
})
export class StatisticCardComponent implements OnInit,OnChanges {
	constructor() {}

	ngOnInit() {}

	ngOnChanges() {
		this.statisticType = 'Table';
	}

	@Input() data;

	// 当前显示统计类型
	private statisticType = 'Table';


	@Output() onSwitchCard = new EventEmitter<number>();
	// 切换当前显示卡片
	switchCard(change: number): void {
		this.onSwitchCard.emit(change);
	}
}