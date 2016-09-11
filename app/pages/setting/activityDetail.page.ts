import { Component, OnInit } from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
      
import {
	StatisticsDetailPage
} from './statisticsDetail.page';

@Component({
	templateUrl: 'build/pages/setting/activityDetail.page.html'
})
export class ActivityDetailPage implements OnInit {
	constructor(private navCtrl: NavController,private navParams: NavParams) {
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
}