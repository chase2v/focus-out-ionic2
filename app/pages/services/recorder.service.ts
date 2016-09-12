import { Injectable } from '@angular/core';

import { StoreService} from './store.service';

@Injectable()
export class RecorderService {
	
	constructor(private store: StoreService) { }

	 record(): void {
	 	this.store.getData(0, ["statistics","target","id"]).then(res => {
	 		let newRecord = {};
	 		let date = new Date();
	 		date = new Date(date.toDateString());

	 		let date_ = new Date(res.statistics[0].date);

	 		if(date.valueOf() === date_.valueOf()) {
	 			res.statistics[0].amount += 1;
	 			this.store.setData(res.id, res);
	 			console.log('记录了一条信息为：' + res.statistics[0]);
	 		} else {
	 			Object.assign(newRecord, {date: date,amount: 1,target: res.target})
	 			res.statistics.unshift(newRecord);
	 			this.store.setData(res.id, res);
	 			console.log('记录了一条信息为：' + res.statistics[0]);
	 		}
	 	});
	 }
}