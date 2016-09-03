import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core';
import {
	NavController
} from 'ionic-angular';
import {
	TimerComponent
} from './timer.component';
import {
	InfoCardComponent
} from './infoCard.component'

@Component({
	templateUrl: 'build/pages/timer/timer.page.html',
	directives: [ TimerComponent, InfoCardComponent ]
})
export class TimerPage implements OnInit {
	constructor(private navCtrl: NavController) {
		console.log('Run constructor!');
	}

	ngOnInit() {
		console.log('Run ngOnInit!');
	}

}