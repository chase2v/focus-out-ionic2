import {
	Injectable
} from '@angular/core';
import {
	Subject
} from 'rxjs/Subject';

@Injectable()
export class StateService {

	constructor() {
		console.log('Run constructor!')
	}

	// 暴露出去的 timer 的状态
	get timerState(): string {
		return this._timerState; // 返回实际状态值
	}
	set timerState(state: string) {
		console.log('你无权操作状态！'); // 只能由switchState方法来切换状态
	}

	// 内部存储的 timer 实际状态
	private _timerState = 'stop';

	// 日志
	private log = [];

	private stateSwitcher = new Subject < string > ();

	stateSwitched = this.stateSwitcher.asObservable();

	switchState(message: string, operatorId: number): void {
		console.log('状态切换为' + message);
		this.log.push('message:' + message + '\noperator:' + operatorId); // 记录状态切换操作

		// 防止重复操作，进行判断
		if(this._timerState !== message) {
			this._timerState = message;
			message += ',' + operatorId;
			this.stateSwitcher.next(message);
		}
	}

	// 打印日志
	printLog(): void {
		for (let i = 0;i < this.log.length;i++) {
			console.log(this.log[i] + '\n');
		}
	}
}