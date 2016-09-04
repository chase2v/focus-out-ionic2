import {
	Component,
	ViewChild
} from '@angular/core';

@Component({
	selector: 'info-card',
	templateUrl: 'build/pages/timer/infoCard.component.html'
})
export class InfoCardComponent {
	// 用于获取自己的 dom
	@ViewChild('myself') myself;

	constructor() {
		console.log('Run constructor!');
	}

	// 调整卡片尺寸，来适应不同尺寸的设备
	resize(contentHeight: number): void {
		console.log('Run resize!');

		let myStyle = this.myself.nativeElement.style;
		myStyle.height = (contentHeight / 4 - 60) + 'px';
	}
}