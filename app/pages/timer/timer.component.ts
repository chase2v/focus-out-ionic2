import {
	Component,
	Output,
	ViewChild,
	EventEmitter
} from '@angular/core';
import {
	StateService
} from '../baseUI/state.service';

@Component({
	selector: 'timer-component',
	templateUrl: 'build/pages/timer/timer.component.html'
})
export class TimerComponent {
	constructor(private stateService: StateService) {
		console.log('Run constructor!');

		this.stateService.stateSwitched.subscribe(message => {
			let msg = message.split(',');
			if (msg[1] !== '0') {
				if (msg[0] === 'stop') {
					this.stop();
				} else if (msg[0] === 'pause') {
					this.pause();
				} else if (msg[0] === 'play') {
					this.play();
				}
			}
		});
	}

	// 组件id
	private id = 0;

	// 用来获取 canvas 的 dom 节点
	@ViewChild('canvas') canvas;

	@ViewChild('playbutton') playButton; // 获取按钮

	@ViewChild('text') text;

	// 播放的一些状态
	private playType = 'work';
	private playButtonIcon = 'play';


	// timer 的设定
	private timeSet = {
		unit: 20,
		workUnit: 'minutes', // or 'seconds'
		breakUnit: 'minutes', // or 'seconds'
		work: 2, // * 20 * 50 * 60
		break: 1
	}

	private initTimeSet = {
		unit: 20,
		workUnit: 'minutes', // or 'seconds'
		breakUnit: 'minutes', // or 'seconds'
		work: 2, // * 20 * 50 * 60
		break: 1
	}

	// 全局管理定时器
	private interval = 0; // 定时器id
	private i = 0; // 计数器
	private currentPos = 1.5 * Math.PI; // timer 指针现在所处的位置
	private time = this.timeSet.work * 50 * 60;

	// 一些共用的绘制参数
	private drawArgs = {
		r: [],
		center: [],
		contentH: undefined
	}

	// 状态管理函数
	stateSwitch(): void {
		if (this.stateService.timerState === 'stop') {
			this.play();
			this.stateService.switchState('play', this.id);
		} else if (this.stateService.timerState === 'pause') {
			this.play();
			this.stateService.switchState('play', this.id);
		} else if (this.stateService.timerState === 'play') {
			this.pause();
			this.stateService.switchState('pause', this.id);
		}
	}

	/**
	 * 在画布上绘画
	 */
	draw(contentHeight: number): void {
		console.log('Run draw!');

		// 绘制图形时所用到的一些参数
		let cvsWidth = screen.availWidth * 3, // 画布宽度
			offsetHeight = 75, // timer距离顶部的距离（自定义）
			r = (contentHeight * 3 * 3 / 4 - offsetHeight) / 2.8, // （自定义）
			radius = [r / 2, r], // 小圆和大圆的半径
			center = [cvsWidth / 2, offsetHeight + radius[1]]; // 圆心坐标

		// 传出去，以便其他方法调用
		this.drawArgs.r = radius;
		this.drawArgs.center = center;
		this.drawArgs.contentH = contentHeight;

		// 绘制长方形所需要的一些参数，两长方形之间间隔 100
		let rect = [radius[1] - 50, radius[1] * 2 * .8], // 长方形的宽度、高度（自定义）
			left = [center[0] - radius[1], center[1]], // 左长方形绘制起点
			right = [center[0] + 50, center[1]], // 右长方形绘制起点
			bottomH = radius[1] * 2 * .1 - 10, // 长方形底部高度（自定义）
			bottomR = 10, // 长方形底部圆角（自定义）
			leftBottom = [ // 左长方形底部的四个关键点，左上，左下，右上，右下
				[left[0], left[1] + rect[1]],
				[left[0], left[1] + rect[1] + bottomH + bottomR],
				[left[0] + rect[0], left[1] + rect[1] + bottomH + bottomR],
				[left[0] + rect[0], left[1] + rect[1]]
			],
			rightBottom = [ // 右长方形底部的四个关键点，左上，左下，右上，右下
				[right[0], right[1] + rect[1]],
				[right[0], right[1] + rect[1] + bottomH + bottomR],
				[right[0] + rect[0], right[1] + rect[1] + bottomH + bottomR],
				[right[0] + rect[0], right[1] + rect[1]]
			];

		let cvsHeight = 5 + offsetHeight + radius[1] + rect[1] + bottomH + bottomR; // 画布高度，必须根据其他数据得出（自定义）

		// 获取 canvas 元素的 dom
		let canvas = this.canvas.nativeElement;
		// 设置画布在设备中显示的大小（缩放比：3）
		canvas.style.height = cvsHeight / 3 + 'px';
		// 设置画布的实际宽、高
		canvas.width = cvsWidth;
		canvas.height = cvsHeight;

		// 设置样式
		let ctx = canvas.getContext('2d');
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#000';

		// ******************* 开始绘制图形 *********************
		// 绘制左、右长方形
		ctx.fillStyle = '#000';
		ctx.rect(left[0], left[1], rect[0], rect[1]);
		ctx.rect(right[0], right[1], rect[0], rect[1]);
		ctx.fill();
		ctx.stroke();

		// 绘制左长方形底部区域
		ctx.fillStyle = '#fff';
		ctx.lineJoin = 'round';
		ctx.beginPath();
		ctx.moveTo(leftBottom[0][0], leftBottom[0][1]);
		ctx.lineTo(leftBottom[1][0], leftBottom[1][1] - bottomR);
		ctx.arcTo(leftBottom[1][0], leftBottom[1][1], leftBottom[1][0] + bottomR, leftBottom[1][1], bottomR);
		ctx.lineTo(leftBottom[2][0] - bottomR, leftBottom[2][1]);
		ctx.arcTo(leftBottom[2][0], leftBottom[2][1], leftBottom[2][0], leftBottom[2][1] - bottomR, bottomR);
		ctx.lineTo(leftBottom[3][0], leftBottom[3][1]);
		ctx.fill();
		ctx.stroke();

		// 绘制右长方形底部区域
		ctx.fillStyle = '#fff';
		ctx.lineJoin = 'round';
		ctx.beginPath();
		ctx.moveTo(rightBottom[0][0], rightBottom[0][1]);
		ctx.lineTo(rightBottom[1][0], rightBottom[1][1] - bottomR);
		ctx.arcTo(rightBottom[1][0], rightBottom[1][1], rightBottom[1][0] + bottomR, rightBottom[1][1], bottomR);
		ctx.lineTo(rightBottom[2][0] - bottomR, rightBottom[2][1]);
		ctx.arcTo(rightBottom[2][0], rightBottom[2][1], rightBottom[2][0], rightBottom[2][1] - bottomR, bottomR);
		ctx.lineTo(rightBottom[3][0], rightBottom[3][1]);
		ctx.fill();
		ctx.stroke();

		// 绘制大圆形，背景为黄色
		ctx.fillStyle = '#ff0';
		ctx.beginPath();
		ctx.arc(center[0], center[1], radius[1], 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();

		// 绘制小圆，背景为白色
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(center[0], center[1], radius[0], 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
		// ************* 图形绘制结束 **************

		// 动态处理文字样式，经测量文字的div高度为94
		let textStyle = this.text.nativeElement.style,
			text = this.text.nativeElement,
			textLeft = text.querySelector('.timer-text-left'),
			textRight = text.querySelector('.timer-text-right'),
			time = text.querySelectorAll('.time'),
			minutes = text.querySelectorAll('.minutes'),
			type = text.querySelectorAll('.type');
		textStyle.width = radius[1] * 2 / 3 + 'px';
		textStyle.height = radius[1] * .8 / 3 + 'px';
		textStyle.left = (screen.availWidth - radius[1] * 2 / 3) / 2 + 'px';
		textStyle.top = (offsetHeight + radius[1] * 2) / 3 + 'px';

		textLeft.style.width = (parseFloat(textStyle.width) / 2 - 50 / 3) + 'px';
		textRight.style.width = (parseFloat(textStyle.width) / 2 - 50 / 3) + 'px';

		time.forEach(x=>{
			let height = window.getComputedStyle(x).height;
			x.style.lineHeight = height;
			x.style.fontSize = parseFloat(height) * .75 + 'px';
		});
		minutes.forEach(x=>{
			let height = window.getComputedStyle(x).height;
			x.style.lineHeight = window.getComputedStyle(x).height;
			x.style.fontSize = parseFloat(height) * .75 + 'px';
		});
		type.forEach(x=>{
			let height = window.getComputedStyle(x).height;
			x.style.lineHeight = window.getComputedStyle(x).height;
			x.style.fontSize = parseFloat(height) * .75 + 'px';
		});

		// 动态处理播放按钮的top位置，大小
		let playButtonStyle = this.playButton._elementRef.nativeElement.style;
		playButtonStyle.fontSize = radius[0] / 5 + 'px';
		playButtonStyle.top = (center[1] / 3 - (radius[0] / 5) * 1.3 / 2) + 'px';
	}

	/**
	 * play 函数
	 */
	play(lastState?: string): void {
		console.log('Run play!');

		// 按钮状态切换
		this.playButtonIcon = 'pause';

		// 获取参数
		let r = this.drawArgs.r,
			center = this.drawArgs.center;

		// 获取画布，设置基础样式
		let ctx = this.canvas.nativeElement.getContext('2d');
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#000';

		// 声明一些绘制需要的参数
		let time = this.time;

		// 开始绘制
		let inter = 2 / time * Math.PI,
			nextPos = this.currentPos - inter;
		this.interval = setInterval(() => {

			// 随着时间变化，动态改变时间
			let t_ = (time - this.i) % 50,
				t = (time - this.i) / 50;
			if(t_ === 0 && t <= 120) { // 定时器每运行50次，是一秒
				console.log(t);
				if(this.playType === 'work') {
					this.timeSet.work = t;
					this.timeSet.workUnit = 'seconds';
				} else {
					this.timeSet.break = t;
					this.timeSet.breakUnit = 'seconds';
				}
			}

			if (this.currentPos < inter) {
				nextPos = 2 * Math.PI - (inter - this.currentPos);
			} else {
				nextPos = this.currentPos - inter;
			}

			ctx.fillStyle = '#EDE9CA';
			ctx.moveTo(center[0], center[1]);
			ctx.arc(center[0], center[1], r[1], this.currentPos, nextPos, true);
			ctx.closePath();
			ctx.fill();

			// 绘制小圆，背景为白色
			ctx.fillStyle = '#fff';
			ctx.beginPath();
			ctx.arc(center[0], center[1], r[0], 0, 2 * Math.PI);
			ctx.fill();

			ctx.stroke();
			this.currentPos = nextPos;
			this.i++;

			// 结束时需要做的事情
			if (this.i === time) {
				clearInterval(this.interval); // 清除定时器
				this.stateService.switchState('stop', this.id); // 切换状态
				this.playButtonIcon = 'play'; // 切换按钮状态
				this.i = 0; // 计数清零
				this.currentPos = 1.5 * Math.PI; // 恢复初始位置
				this.timeSet = Object.assign({}, this.initTimeSet); // 恢复timeSet数据

				// 重新绘制图形，恢复的初始状态
				if (this.playType === 'work') {
					this.playType = 'break';
					this.time = this.timeSet.break;

					ctx.fillStyle = '#0f0';
					ctx.moveTo(center[0], center[1]);
					ctx.arc(center[0], center[1], r[1], 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();

					// 绘制小圆，背景为白色
					ctx.fillStyle = '#fff';
					ctx.beginPath();
					ctx.arc(center[0], center[1], r[0], 0, 2 * Math.PI);
					ctx.fill();

					ctx.stroke();
				} else {
					this.playType = 'work';
					this.time = this.timeSet.work;

					ctx.fillStyle = '#ff0';
					ctx.moveTo(center[0], center[1]);
					ctx.arc(center[0], center[1], r[1], 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();

					// 绘制小圆，背景为白色
					ctx.fillStyle = '#fff';
					ctx.beginPath();
					ctx.arc(center[0], center[1], r[0], 0, 2 * Math.PI);
					ctx.fill();

					ctx.stroke();
				}

				console.log('Play over!');
			}
		}, this.timeSet.unit);
	}

	/**
	 * 暂停
	 */
	pause(): void {
		console.log('Run pause!');

		clearInterval(this.interval); // 清除定时器
		this.playButtonIcon = 'play'; // 切换按钮状态
	}

	stop(): void {
		console.log('Run stop!');
		clearInterval(this.interval); // 清除定时器
		this.playButtonIcon = 'play'; // 恢复图标

		// 重绘 timer
		let ctx = this.canvas.nativeElement.getContext('2d');
		let center = this.drawArgs.center, // 获取数据
			r = this.drawArgs.r;

		ctx.strokeStyle = '#000';
		ctx.lineWitdh = 3;

		// 设置interval运行次数，时间总长度 = 20 * this.i
		this.i = 50;

		// 绘制的参数
		let inter = this.currentPos > 1.5 * Math.PI ? (2 * Math.PI - (this.currentPos - 1.5 * Math.PI)) / 50 : (1.5 * Math.PI - this.currentPos) / 50,
			nextPos = this.currentPos + inter;

		this.interval = setInterval(() => {
			if (this.playType === 'work') {
				ctx.fillStyle = '#ff0';
			} else {
				ctx.fillStyle = '#0f0';
			}
			ctx.moveTo(center[0], center[1]);
			ctx.arc(center[0], center[1], r[1], this.currentPos, nextPos);
			ctx.closePath();
			ctx.fill();

			// 绘制小圆，背景为白色
			ctx.fillStyle = '#fff';
			ctx.beginPath();
			ctx.arc(center[0], center[1], r[0], 0, 2 * Math.PI);
			ctx.fill();

			ctx.stroke();
			this.i--;
			console.log(this.i);
			if (this.i === 0) {
				clearInterval(this.interval);
			}
			this.currentPos = nextPos;
			nextPos += inter;
			if (nextPos >= 2 * Math.PI) {
				nextPos = nextPos - 2 * Math.PI;
			}
		}, 20);
	}
}