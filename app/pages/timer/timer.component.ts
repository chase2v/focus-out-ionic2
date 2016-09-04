import {
	Component,
	Output,
	ViewChild,
	EventEmitter
} from '@angular/core';

@Component({
	selector: 'timer-component',
	templateUrl: 'build/pages/timer/timer.component.html'
})
export class TimerComponent {
	// 用来获取 canvas 的 dom 节点
	@ViewChild('canvas') canvas;
	@ViewChild('textTimeLeft') textTimeLeft;
	@ViewChild('textTimeRight') textTimeRight;
	@ViewChild('playbutton') playButton;

	// 播放的一些状态
	private playType = 'work';
	private playState = 'stop';
	private playButtonIcon = 'play';

	// 全局管理定时器
	private interval = 0;
	private i = 0;
	private currentPos = 1.5 * Math.PI;

	constructor() {
		console.log('Run constructor!');
	}

	// 一些共用的绘制参数
	private drawArgs = {
		r: [],
		center: [],
		contentH: undefined
	}

	// 状态管理函数
	stateSwitch(): void {
		if (this.playState === 'stop') {
			this.play('stop');
			this.playState = 'play';
		} else if (this.playState === 'pause') {
			this.play('pause');
			this.playState = 'play';
		} else if (this.playState === 'play') {
			this.pause();
			this.playState = 'pause';
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

		// 绘制文字，文字宽度经测量约为90px
		ctx.fillStyle = '#000';
		ctx.font = bottomR + bottomH - 30 + 'px Arial';
		ctx.fillText('Break Time', left[0] + (rect[0] - 270) / 2, leftBottom[1][1] - 25, 270);
		ctx.fillText('Work Time', right[0] + (rect[0] - 260) / 2, rightBottom[1][1] - 25, 260);

		// 动态处理文字样式，经测量文字的div高度为94
		let textLeftStyle = this.textTimeLeft.nativeElement.style;
		textLeftStyle.width = rect[0] / 3 + 'px';
		textLeftStyle.left = left[0] / 3 + 'px';
		textLeftStyle.top = (left[1] + radius[1]) / 3 + (leftBottom[0][1] / 3 - ((left[1] + radius[1]) / 3 + 94)) + 'px';

		let textRightStyle = this.textTimeRight.nativeElement.style;
		textRightStyle.width = rect[0] / 3 + 'px';
		textRightStyle.left = right[0] / 3 + 'px';
		textRightStyle.top = (left[1] + radius[1]) / 3 + (leftBottom[0][1] / 3 - ((left[1] + radius[1]) / 3 + 94)) + 'px';

		// 动态处理播放按钮的top位置，大小
		let playButtonStyle = this.playButton._elementRef.nativeElement.style;
		playButtonStyle.fontSize = radius[0] / 5 + 'px';
		playButtonStyle.top = (center[1] / 3 - (radius[0] / 5) * 1.3 / 2) + 'px';
	}

	/**
	 * play 函数
	 */
	// 时间间隔的设置
	private timeSet = {
		workTime: 60,
		breakTime: 30
	}
	play(lastState: string): void {
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
		let time;
		if (this.playType === 'work') {
			time = this.timeSet.workTime;
		} else if (this.playType === 'break') {
			time = this.timeSet.breakTime;
		}

		// 判断状态和类型进行参数的设定
		// if (lastState === 'stop') {
		// } else if (lastState === 'pause') {

		// }

		// 开始绘制
		let inter = 2 / time * Math.PI,
			nextPos = this.currentPos - inter;
		this.interval = setInterval(() => {

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
			console.log(this.i);

			// 结束时需要做的事情
			if (this.i === time) {
				clearInterval(this.interval); // 清除定时器
				this.playState = 'stop'; // 切换状态
				this.playButtonIcon = 'play'; // 切换按钮状态
				this.i = 0; // 计数清零
				this.currentPos = 1.5 * Math.PI; // 恢复初始位置

				// 重新绘制图形，恢复的初始状态
				if (this.playType === 'work') {
					this.playType = 'break';

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
		}, 1000);
	}

	/**
	 * 暂停
	 */
	pause(): void {
		console.log('Run pause!');

		clearInterval(this.interval); // 清除定时器
		this.playButtonIcon = 'play'; // 切换按钮状态
	}
}