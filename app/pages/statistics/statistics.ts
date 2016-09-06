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

@Component({
	templateUrl: 'build/pages/statistics/statistics.html'
})
export class StatisticsPage implements OnInit {
	constructor(private navCtrl: NavController, private modalCtrl: ModalController) {}

	ngOnInit() {
		console.log('Run ngOnInit!(StatisticsPage)');

		console.log('Run ionViewWillEnter!(StatisticsPage)')
		let accountType = localStorage.getItem('accountType'),
			needCloud = localStorage.getItem('needCloud');
		if ((accountType === null && needCloud !== "false") || (accountType === 'local' && needCloud !== "false")) {
			this.navCtrl.push(AskPage);
		}
	}

	ionViewWillEnter() {
	}
}