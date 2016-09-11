import {
	Injectable
} from '@angular/core';

// 导入subject
import {
	Subject
} from 'rxjs/Subject';

@Injectable()
export class TimerSwitcherService {

	constructor() {}

	private timerSwitcher = new Subject < number > ();

	timerSwichterObservable = this.timerSwitcher.asObservable();

	private currentTimer = 1;
	timersAmount: number;

	getCurrentTimer(): number {
		return this.currentTimer;
	}

	switchTimer(change: number): void {
		console.log('Run switchTimer(TimerSwitcherService)');
		// this.timersAmount = this.store.length;
		if (this.timersAmount === -1) {
			console.log('还没完成初始化！');
		}

		if (!(this.currentTimer === 1 && change === -1) && !(this.currentTimer === this.timersAmount && change === 1)) {
			this.currentTimer += change;
		}
		this.timerSwitcher.next(this.currentTimer);
	}
}