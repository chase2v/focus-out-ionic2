import {
	Component,
	ViewChild,
	Output,
	EventEmitter
} from '@angular/core';
import {
	NavController,
	Content
} from 'ionic-angular';
import {
	TimerComponent
} from './timer.component';
import {
	InfoCardComponent
} from './infoCard.component'

@Component({
	templateUrl: 'build/pages/timer/timer.page.html',
	directives: [TimerComponent, InfoCardComponent]
})
export class TimerPage {
	@ViewChild(Content) content; // 用于获取 ion-content 的 dom
	@ViewChild(TimerComponent) timerComponent; // 用于获取 timer 组件的节点
	@ViewChild(InfoCardComponent) infoCardComponent; // 用于获取 infoCard 组件的节点

	private stateIsDraw = false; // 判断 timer 是否已经绘制
	private contentHeight: number; // 获取设备可用高度

	constructor(private navCtrl: NavController) {
		console.log('Run constructor!');
	}

	ionViewDidEnter() {
		console.log('Run ionViewDidEnter!');

		// 获取设备可用的实际高度
		let contentHeight = this.content._scrollEle.clientHeight;
		console.log(contentHeight);

		// 判断是否是第一次载入
		if (!this.stateIsDraw) {
			this.timerComponent.draw(contentHeight); // timer 的绘制
			this.infoCardComponent.resize(contentHeight); // 调整 infoCard 的尺寸
			this.stateIsDraw = !this.stateIsDraw; // 设置页面已经绘制
		}
	}


	/**
	 * 用于传播 onplay 事件
	 * @param {any} message [description]
	 */
	@Output() onPlay = new EventEmitter<any>();
	play(message: any): void {
		console.log('传送onPlay！');

		this.onPlay.emit(message);
	}

}