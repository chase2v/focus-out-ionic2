import {
	Component
} from '@angular/core';
import {
	NavController,
	ModalController
} from 'ionic-angular';

import {
	ActivitiesPage
} from './activities.page';

import {
	StoreService
} from '../services/store.service';

@Component({
	templateUrl: 'build/pages/setting/setting.html'
})
export class SettingPage {
	constructor(private navCtrl: NavController,private modalCtrl: ModalController,private store: StoreService) {
		this.store.getSettings().then(res=>{
			this.isSync = res.isSyne;
		});
	}

	private isSync: boolean;

	handleToggleChange() {
		debugger
	}

	onClickActivities() {
		this.navCtrl.push(ActivitiesPage);
	}
}