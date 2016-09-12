import { Component, OnInit } from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';

import {
	StoreService
} from '../services/store.service';
      
@Component({
	templateUrl: 'build/pages/setting/statisticsDetail.page.html'
})
export class StatisticsDetailPage implements OnInit {
	constructor(private navCtrl: NavController,private navParams: NavParams,private store: StoreService) {
		this.statistics = this.navParams.get("data");
	}

	ngOnInit() {}

	private statistics = {};

	// 修改数据
	changeData() {
		this.store.setData(this.data.id, this.data);
	}

	close() {
		this.navCtrl.pop();
	}
}