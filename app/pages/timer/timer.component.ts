import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core';

@Component({
	selector: 'timer-component',
	templateUrl: 'build/pages/timer/timer.component.html'
})
export class TimerComponent implements OnInit {
	// 用来获取 canvas 的 dom 节点
	@ViewChild('canvas') canvas;
	@ViewChild('textTimeLeft') textTimeLeft;
	@ViewChild('textTimeRight') textTimeRight;
	@ViewChild('playbutton') playButton;

	constructor() {}

	/**
	 * 在页面初始化时，进行时钟的绘制
	 */
	ngOnInit() {
		this.draw();
	}

	/**
	 * 在画布上绘画
	 * 1.画一个圆 
	 */
	draw(): void {

		// 绘制图形时所用到的一些参数
		let cvsWidth = screen.availWidth * 3, // 画布宽度
			offsetHeight = screen.availHeight * 3 * .04, // timer距离顶部的距离
			radius = [cvsWidth * 0.175, cvsWidth * 0.35], // 小圆和大圆的半径
			center = [cvsWidth / 2, offsetHeight + radius[1]]; // 圆心坐标

		// 绘制长方形所需要的一些参数
		let rect = [radius[1] - 50, radius[1] * 2 * 0.85], // 长方形的宽度、高度
			left = [center[0] - radius[1], center[1]], // 左长方形绘制起点
			right = [center[0] + 50, center[1]], // 右长方形绘制起点
			bottomH = 75, // 长方形底部高度
			bottomR = 10, // 长方形底部圆角
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

		let cvsHeight = 150 + radius[1] + rect[1] + bottomH + bottomR; // 画布高度，必须根据其他数据得出

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

		// 开始绘制
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

		// 绘制文字，文字宽度经测量约为90px
		ctx.fillStyle = '#000';
		ctx.font = bottomR + bottomH - 30 + 'px Arial';
		ctx.fillText('Break Time', left[0] + (rect[0] - 270) / 2, leftBottom[1][1] - 25, 270);
		ctx.fillText('Work Time', right[0] + (rect[0] - 260) / 2, rightBottom[1][1] - 25, 260);

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

		// 动态处理文字样式，经测量文字的div高度为94
		let textLeftStyle = this.textTimeLeft.nativeElement.style;
		textLeftStyle.width = rect[0] / 3 + 'px';
		textLeftStyle.left = left[0] / 3 + 'px';
		textLeftStyle.top = (left[1] + radius[1]) / 3 + (leftBottom[0][1] / 3 - ((left[1] + radius[1]) / 3 + 94)) + 'px';

		let textRightStyle = this.textTimeRight.nativeElement.style;
		textRightStyle.width = rect[0] / 3 + 'px';
		textRightStyle.left = right[0] / 3 + 'px';
		textRightStyle.top = (left[1] + radius[1]) / 3 + (leftBottom[0][1] / 3 - ((left[1] + radius[1]) / 3 + 94)) + 'px';

		// 动态处理播放按钮的top位置
		let playButtonStyle = this.playButton._elementRef.nativeElement.style;
		playButtonStyle.top = (center[1] / 3 - 30) + 'px';
	}
}