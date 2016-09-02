import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core';
import {
	NavController
} from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/timer/timer.html',
})
export class TimerPage implements OnInit {
	// 用来获取 canvas 的 dom 节点
	@ViewChild('canvas') canvas;

	constructor(private navCtrl: NavController) {
		console.log('Run constructor!');
	}

	/**
	 * 在页面初始化时，进行时钟的绘制
	 */
	ngOnInit() {
		console.log('Run ngOnInit!');

		this.draw();
	}

	// 绘制图形时所用到的一些参数
	private drawArgs = {
		cvsWidth: 900,
		cvsHeight: 1500,
		radius: [200, 400], // 小圆和大圆的半径

	}

	/**
	 * 在画布上绘画
	 * 1.画一个圆 
	 */
	draw(): void {
		let canvas = this.canvas.nativeElement;

		// 设置画布的宽、高
		canvas.width = 900;
		canvas.height = 1500;

		// 设置样式
		let ctx = canvas.getContext('2d');
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#000';

		// 开始绘制
		// 绘制左、右长方形
		ctx.fillStyle = '#384E5C';
		ctx.rect(50, 450, 350, 750);
		ctx.rect(500, 450, 350, 750);
		ctx.fill();
		ctx.stroke();

		// 绘制左长方形底部区域
		ctx.fillStyle = '#00FDEB';
		ctx.lineJoin = 'round';
		ctx.beginPath();
		ctx.moveTo(50, 1200);
		ctx.lineTo(50, 1300);
		ctx.arcTo(50, 1310, 60, 1310, 10);
		ctx.lineTo(390, 1310);
		ctx.arcTo(400, 1310, 400, 1300, 10);
		ctx.lineTo(400, 1200);
		ctx.fill();
		ctx.stroke();

		// 绘制右长方形底部区域
		ctx.fillStyle = '#ff0';
		ctx.lineJoin = 'round';
		ctx.beginPath();
		ctx.moveTo(500, 1200);
		ctx.lineTo(500, 1300);
		ctx.arcTo(500, 1310, 510, 1310, 10);
		ctx.lineTo(840, 1310);
		ctx.arcTo(850, 1310, 850, 1300, 10);
		ctx.lineTo(850, 1200);
		ctx.fill();
		ctx.stroke();

		// 绘制 “工作” 弧形，背景为黄色
		ctx.fillStyle = '#ff0';
		ctx.beginPath();
		ctx.arc(450, 450, 400, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();

		// 绘制 “休息” 弧形，背景为绿色
		ctx.fillStyle = '#00FDEB';
		ctx.beginPath();
		ctx.moveTo(450, 450);
		ctx.arc(450, 450, 450, 1.88 * Math.PI, 1.5 * Math.PI, true);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// 绘制小圆，背景为白色
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(450, 450, 200, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}