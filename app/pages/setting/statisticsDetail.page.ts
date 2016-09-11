import { Component, OnInit } from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
      
@Component({
	templateUrl: 'build/pages/setting/statisticsDetail.page.html'
})
export class StatisticsDetailPage implements OnInit {
	constructor(private navCtrl: NavController,private navParams: NavParams) {
		this.statistics = this.navParams.get("data");
	}

	ngOnInit() {}

	private statistics = {};

	close() {
		this.navCtrl.pop();
	}
}