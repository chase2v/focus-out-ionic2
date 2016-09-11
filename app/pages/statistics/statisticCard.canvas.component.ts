import {
	Component,
	OnInit,
	ViewChild,
	Input
} from '@angular/core';

@Component({
	selector: 'statistic-canvas',
	templateUrl: 'build/pages/statistics/statisticCard.canvas.component.html'
})
export class StatisticCardCanvasComponent implements OnInit {
	constructor() {}

	@Input() data;
	@ViewChild('canvas') cvs;

	ngOnInit() {
		this.draw();
	}



	draw(): void {
		// 取得数据
		let data = this.data.statistics;


		// 取得或设置绘画数据
		let hNum = 32; // 横线数量
		// 获得竖线数量
		let arr = [];
		data.forEach(v => {
			arr.push(v.amount);
			arr.push(v.target);
		});
		let vNum = Math.max.apply(null, arr) + 3;
		// 画布大小
		let cvsH = (screen.availHeight - 121 - 120) * 3,
			cvsW = (screen.availWidth - 56) * 3;
		// 背景大小
		let bgW = cvsW - 180,
			bgH = cvsH - 270;
		// 背景横竖格宽高度
		let bgUnitW = bgW / (vNum - 1),
			bgUnitH = bgH / (hNum - 1);


		// ************ 开始绘制 *************
		let cvsRef = this.cvs.nativeElement;
		cvsRef.width = cvsW;
		cvsRef.height = cvsH;
		let ctx = cvsRef.getContext('2d');

		// 绘制背景
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#f2f2f2";
		ctx.fillStyle = "#000";

		ctx.translate(150, 90); // 设定原点
		// 绘制横线
		for (let i = 0; i < hNum; i++) {
			ctx.beginPath();
			ctx.moveTo(0, i * bgUnitH);
			ctx.lineTo(bgW, i * bgUnitH);
			ctx.stroke();

			// 绘制文字
			if (i === 1 || (i - 1) % 5 === 0) {
				if (data[i - 1]) {
					ctx.font = "42px Arial";
					let text = data[i - 1].date.match(/^\d{1,2}\/\d{1,2}/)[0],
						textW = ctx.measureText(text).width;
					ctx.fillText(text, -75 - textW / 2, i * bgUnitH + 21);
				}
			} else if (i === data.length) {
				ctx.font = "42px Arial";
				let text = data[i - 1].date.match(/^\d{1,2}\/\d{1,2}/)[0],
					textW = ctx.measureText(text).width;
				ctx.fillText(text, -75 - textW / 2, i * bgUnitH + 21);
			}
		}
		// 绘制竖线
		for (let i = 0; i < vNum; i++) {
			ctx.beginPath();
			ctx.moveTo(i * bgUnitW, 0);
			ctx.lineTo(i * bgUnitW, bgH);
			ctx.stroke();

			// 绘制文字
			ctx.fillStyle = '#000';
			ctx.font = '45px Arial';
			let textW = ctx.measureText(i).width;
			ctx.fillText(i, i * bgUnitW - textW / 2, -15);

			// 绘制方格
			if(i !== vNum - 1) {
				ctx.fillStyle = '#f2f2f2';
				for (let j = 0; j < hNum - 1; j++) {
					if(i%2 !== 0 && j%2 !==0) {
						ctx.fillRect(i * bgUnitW, j * bgUnitH, bgUnitW, bgUnitH);
					} else if (i%2 ===0 && j%2 === 0) {
						ctx.fillRect(i * bgUnitW, j * bgUnitH, bgUnitW, bgUnitH);
					}
				}
			}
		}


		// 绘制目标线
		ctx.strokeStyle = '#f00';
		ctx.fillStyle = '#f00';
		let drawTimes = 29 > (data.length - 1) ? (data.length - 1) : 29; // 设置绘制次数

		for (var i = 0; i < drawTimes; i++) {
			ctx.beginPath();
			ctx.moveTo(data[i].target * bgUnitW, bgUnitH * (i + 1));
			ctx.lineTo(data[i + 1].target * bgUnitW, bgUnitH * (i + 2));
			ctx.stroke();
		}

		// 绘制曲线
		ctx.lineWidth = 6;
		ctx.strokeStyle = '#ff0';
		ctx.fillStyle = '#ff0';

		ctx.moveTo(data[0].amount * bgUnitW, bgUnitH);
		ctx.arc(data[0].amount * bgUnitW, bgUnitH, 10, 0, 2 * Math.PI);
		ctx.fill();
		for (var i = 0; i < drawTimes; i++) {
			ctx.beginPath();
			ctx.moveTo(data[i].amount * bgUnitW, bgUnitH * (i + 1));
			ctx.lineTo(data[i + 1].amount * bgUnitW, bgUnitH * (i + 2));
			ctx.stroke();
			ctx.arc(data[i + 1].amount * bgUnitW, bgUnitH * (i + 2), 10, 0, 2 * Math.PI);
			ctx.fill();
		}

		// 绘制说明文字
		ctx.lineWidth = 6;
		let textW1 = ctx.measureText('完成数量').width,
			textW2 = ctx.measureText('目标').width;
		// 黄线说明
		ctx.strokeStyle = '#ff0';
		ctx.fillStyle = '#000';
		ctx.beginPath();
		ctx.moveTo(bgW-5*bgUnitW-textW1-textW2, 31*bgUnitH + 45);
		ctx.lineTo(bgW-3.5*bgUnitW-textW1-textW2, 31*bgUnitH+45);
		ctx.stroke();
		ctx.fillText('完成数量',bgW-3*bgUnitW-textW1-textW2,31*bgUnitH+67);
		// 红线说明
		ctx.strokeStyle = '#f00';
		ctx.beginPath();
		ctx.moveTo(bgW-2*bgUnitW-textW2, 31*bgUnitH + 45);
		ctx.lineTo(bgW-0.5*bgUnitW-textW2, 31*bgUnitH+45);
		ctx.stroke();
		ctx.fillText('目标',bgW-textW2,31*bgUnitH+67);
		// 数据说明
		let textW3 = ctx.measureText('*只展示30日内的数据').width;
		ctx.fillText('*只展示30日内的数据', bgW-textW3, 31*bgUnitH+135);

		// ************ 绘制结束 *************
	}
}