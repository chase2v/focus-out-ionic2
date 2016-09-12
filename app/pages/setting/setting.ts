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
	LoginModal
} from '../statistics/login.modal';

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

	enterAccountPage() {
		if(localStorage.getItem("username")) {
			// 查询到已经登录了账户，do something
			debugger
		} else {
			let loginModal = this.modalCtrl.create(LoginModal);
			loginModal.present();
		}
	}

	onClickActivities() {
		this.navCtrl.push(ActivitiesPage);
	}
}