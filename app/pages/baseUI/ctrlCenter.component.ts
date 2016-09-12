import {
	Component,
	Output,
	EventEmitter,
	Input
} from '@angular/core';

// 导入自定义服务
import {
	StateService
} from './state.service.ts';

@Component({
	selector: 'ctrl-center',
	templateUrl: 'build/pages/baseUI/ctrlCenter.component.html'
})
export class CtrlCenterComponent {
	constructor(private stateService: StateService) {
		console.log('Run constructor!');

		this.stateService.stateSwitched.subscribe(message => {
			let msg = message.split(',');
			if(msg[1] !== '1') {
				if (msg[0] === 'play' || msg[0] === 'pause') {
					this.buttonStateSwitcher(msg[0]);
				}			
			}
		});
	}

	// 组件 ID
	private id = 1;

	// 用来传给父组件来触发动作
	@Output() showAdder = new EventEmitter < string > ();
	@Output() showDetail = new EventEmitter < string > ();

	// 用来切换按钮图标
	private buttonIcon = 'play';

	// 用来切换 1 按钮
	@Input() detailCardIcon: string;

	@Input() addCardIcon: string;

	private isDetailCardChanging = false;
	private isAddCardChanging = false;


	/**
	 * 点击 1,4 按钮触发的动作，通过判断参数来确定传给父组件的信息
	 * @param {string} message [description]
	 */
	showCard(message: string): void {
		console.log('Run showCard!');
		if (message.indexOf('detail') !== -1) {
			this.showDetail.emit(message);
		} else if (message.indexOf('add') !== -1){
			this.showAdder.emit(message);
		}
	}

	/**
	 * button按钮
	 * 1.切换图标 Icon
	 * 2.传递播放状态
	 * @param {string} message [description]
	 */
	buttonStateSwitcher(message ? : string): void {
		if (message === 'play') {
			this.buttonIcon = 'pause';
		} else if (message === 'pause') {
			this.buttonIcon = 'play';
		} else if (!message) {
			if(this.stateService.timerState === 'play') {
				this.buttonIcon = 'pause';
				this.stateService.switchState('pause', this.id);
			} else if (this.stateService.timerState === 'pause') {
				this.buttonIcon = 'play';
				this.stateService.switchState('play', this.id);
			} else if (this.stateService.timerState === 'stop') {
				this.buttonIcon = 'pause';
				this.stateService.switchState('play', this.id);
			}
		}
	}

	stop(): void {
		console.log('Run stop!');
		this.stateService.switchState('stop', this.id);
		this.buttonIcon = 'play'; // 恢复图标
	}
}