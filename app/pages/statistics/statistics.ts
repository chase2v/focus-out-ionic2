import {
	Component,
	OnInit
} from '@angular/core';
import {
	NavController,
	ModalController
} from 'ionic-angular';
import {
	AskPage
} from './ask.page';

// import子组件
import {
	StatisticCardComponent
} from './statisticCard.component';

import {
	StoreService
} from '../services/store.service';

@Component({
	templateUrl: 'build/pages/statistics/statistics.html',
	directives: [StatisticCardComponent]
})
export class StatisticsPage implements OnInit {
	constructor(private navCtrl: NavController, private modalCtrl: ModalController, private store: StoreService) {
		this.store.getData(0, ['name', 'statistics', 'id']).then(res => {
			this.data = res;
			this.currentData = res.id;
		});
	}

	ngOnInit() {
		console.log('Run ngOnInit!(StatisticsPage)');

		let accountType = localStorage.getItem('accountType'),
			needCloud = localStorage.getItem('needCloud');
		if ((accountType === null && needCloud !== "false") || (accountType === 'local' && needCloud !== "false")) {
			this.navCtrl.push(AskPage);
		}
	}

	// 模拟数据
	private mockData = [{
		name: 'study',
		statistics: [{
			date: '9/1/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/2/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/3/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/4/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/5/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/6/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/7/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/8/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/9/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/10/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/11/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/12/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/13/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/14/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/15/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/16/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/17/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/18/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/19/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/20/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/21/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/22/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/23/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/24/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/25/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/26/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/27/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/28/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/29/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/30/2016',
			amount: 7,
			target: 10
		}]
	}, {
		name: 'read',
		statistics: [{
			date: '9/1/2016',
			amount: 10,
			target: 11
		}, {
			date: '9/2/2016',
			amount: 9,
			target: 8
		}, {
			date: '9/3/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/4/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/5/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/6/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/7/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/8/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/9/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/10/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/11/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/12/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/13/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/14/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/15/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/16/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/17/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/18/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/19/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/20/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/21/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/22/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/23/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/24/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/25/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/26/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/27/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/28/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/29/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/30/2016',
			amount: 7,
			target: 10
		}]
	}, {
		name: 'sport',
		statistics: [{
			date: '9/1/2016',
			amount: 0,
			target: 3
		}, {
			date: '9/2/2016',
			amount: 2,
			target: 3
		}, {
			date: '9/3/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/4/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/5/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/6/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/7/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/8/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/9/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/10/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/11/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/12/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/13/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/14/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/15/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/16/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/17/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/18/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/19/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/20/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/21/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/22/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/23/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/24/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/25/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/26/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/27/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/28/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/29/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/30/2016',
			amount: 7,
			target: 10
		}]
	}];

	private currentData: number;
	private data = {};

	// 根据命令切换当前显示的卡片的数据
	switchData(change: number): void {
		if (!(change < 0 && this.currentData === 1)) {
			this.store.getData(this.currentData + change, ['id', 'name', 'statistics']).then(res => {
				if(res !== -1) {
					this.data = res;
					this.currentData = res.id;
				}
			});
		}
	}

	handleSwipe(e): void {
		if (e.direction === 2) {
			this.switchData(1);
		} else if (e.direction === 4) {
			this.switchData(-1);
		}
	}
}