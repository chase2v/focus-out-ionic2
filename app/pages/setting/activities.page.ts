import { Component, OnInit } from '@angular/core';
import {NavController} from 'ionic-angular';

import {
	StoreService
} from '../services/store.service';
import {
	ShowCardService
} from '../services/showCard.service';

import {
	ActivityDetailPage
} from './activityDetail.page';

@Component({
	templateUrl: 'build/pages/setting/activities.page.html'
})
export class ActivitiesPage implements OnInit {
	constructor(private navCtrl: NavController, private store: StoreService, private showCardService: ShowCardService) {
		this.store.getAll().then(res => {
			this.activities = res;
		});
	}

	ngOnInit() {}

	private activities = [];

	close() {
		this.navCtrl.pop();
	}

	enterActivityPage(activity) {
		this.navCtrl.push(ActivityDetailPage,{data: activity});
	}

	showAddCard() {
		this.showCardService.showCard('adder');
	}
}