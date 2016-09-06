import {
	Component,
	OnInit
} from '@angular/core';

// 导入服务
import {
	TimerInfoService
} from '../services/timerInfo.service';
import {
	TimerSwitcherService
} from '../services/timerSwitcher.service';

@Component({
	selector: 'detail-card',
	templateUrl: 'build/pages/baseUI/detailCard.component.html'
})
export class DetailCardComponent implements OnInit {
	constructor(private timerInfoService: TimerInfoService,private timerSwitcher: TimerSwitcherService) {
		console.log('Run constructor!(DetailCardComponent)');
	}

	private timerInfo = {
		timeSet: {}
	};

	ngOnInit() {
		let id = this.timerSwitcher.getCurrentTimer();
		this.timerInfoService.queryTimerInfo(id).subscribe(res => {
			this.timerInfo = res;
		});
	}
}