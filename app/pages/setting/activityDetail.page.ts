import { Component, OnInit } from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
      
import {
	StatisticsDetailPage
} from './statisticsDetail.page';

import {
	ShowCardService
} from '../services/showCard.service';

@Component({
	templateUrl: 'build/pages/setting/activityDetail.page.html'
})
export class ActivityDetailPage implements OnInit {
	constructor(private navCtrl: NavController,private navParams: NavParams, private showCardService: ShowCardService) {
		this.data = this.navParams.get("data");
	}

	ngOnInit() {}

	private data = {};

	close() {
		this.navCtrl.pop();
	}

	enterStatisticsPage(data) {
		this.navCtrl.push(StatisticsDetailPage,{data: data});
	}

	// 显示修改卡片
	showDetailCard() {
		this.showCardService.showCard('detail');
	}
}