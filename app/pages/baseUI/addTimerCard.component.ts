import {
	Component,
	OnInit,
	Output,
	EventEmitter
} from '@angular/core';

import {
	StoreService
} from '../services/store.service';

@Component({
	selector: 'add-timer-card',
	templateUrl: 'build/pages/baseUI/addTimerCard.component.html'
})
export class AddTimerCardComponent {
	constructor(private store: StoreService) {}

	private newTimerInfo = {

	}

	/**
	 * 修改计时器信息
	 */
	@Output() onAddCardChanging = new EventEmitter < string > ();
	private sendSignal = false;
	private isChanging = false;
	addTimerCardIsChanging(): void {
		if (!this.isChanging) {
			this.sendSignal = false;
			this.isChanging = true;
			this.onAddCardChanging.emit("changing");
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
					if(i === 60) {
						clearInterval(interval);
						reject('被拒绝了');
					}
				}, 2000);
			}).then(res => {
				debugger
			}).catch(err => console.log(err));
		}
	}
	sendChange(): void {
		this.sendSignal = true;
	}
}