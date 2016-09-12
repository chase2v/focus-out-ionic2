import {
	Injectable
} from '@angular/core';
import {
	Storage,
	SqlStorage
} from 'ionic-angular';

import {
	TimerSwitcherService
} from './timerSwitcher.service';

import {
	Timer
} from './timer.model';

@Injectable()
export class StoreService {

	// 数据库
	private storage: Storage;

	// 初始数据
	private initData: Timer[] = [{
		name: "study",
		id: 1,
		type: "default",
		target: 5,
		theme: "default",
		work: 25,
		break: 5,
		statistics: [{
			date: '9/1/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/2/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/3/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/4/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/5/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/6/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/7/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/8/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/9/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/10/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/11/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/12/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/13/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/14/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/15/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/16/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/17/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/18/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/19/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/20/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/21/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/22/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/23/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/24/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/25/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/26/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/27/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/28/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/29/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/30/2016',
			amount: 7,
			target: 10
		}]
	}, {
		name: "read",
		id: 2,
		type: "default",
		target: 2,
		theme: "default",
		work: 30,
		break: 5,
		statistics: [{
			date: '9/1/2016',
			amount: 10,
			target: 11
		}, {
			date: '9/2/2016',
			amount: 9,
			target: 8
		}, {
			date: '9/3/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/4/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/5/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/6/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/7/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/8/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/9/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/10/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/11/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/12/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/13/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/14/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/15/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/16/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/17/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/18/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/19/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/20/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/21/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/22/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/23/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/24/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/25/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/26/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/27/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/28/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/29/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/30/2016',
			amount: 7,
			target: 10
		}]
	}, {
		name: "sport",
		id: 3,
		type: "default",
		target: 2,
		theme: "default",
		work: 20,
		break: 10,
		statistics: [{
			date: '9/1/2016',
			amount: 0,
			target: 3
		}, {
			date: '9/2/2016',
			amount: 2,
			target: 3
		}, {
			date: '9/3/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/4/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/5/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/6/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/7/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/8/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/9/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/10/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/11/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/12/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/13/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/14/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/15/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/16/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/17/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/18/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/19/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/20/2016',
			amount: 7,
			target: 10
		}, {
			date: '9/21/2016',
			amount: 5,
			target: 5
		}, {
			date: '9/22/2016',
			amount: 6,
			target: 5
		}, {
			date: '9/23/2016',
			amount: 10,
			target: 5
		}, {
			date: '9/24/2016',
			amount: 8,
			target: 5
		}, {
			date: '9/25/2016',
			amount: 9,
			target: 5
		}, {
			date: '9/26/2016',
			amount: 0,
			target: 7
		}, {
			date: '9/27/2016',
			amount: 1,
			target: 8
		}, {
			date: '9/28/2016',
			amount: 2,
			target: 9
		}, {
			date: '9/29/2016',
			amount: 5,
			target: 10
		}, {
			date: '9/30/2016',
			amount: 7,
			target: 10
		}]
	}];
	// 初始设置
	private initSettings = {
		isSync: false
	}

	// 缓存数据
	private bufferData: any;
	// 缓存设置数据
	private bufferSettings: any;

	constructor(private timerSwitcher: TimerSwitcherService) {
		// 创建数据库
		this.storage = new Storage(SqlStorage, {
			name: "focus-out-database",
			existingDatabase: true
		});
	}

	/**
	 * 初始化数据库：
	 * 检测本地是否有存在的数据库
	 * 若有：
	 * 则缓存本地数据库
	 * 若没有：
	 * 则初始化数据库，并缓存
	 */
	init(): void {
		this.storage.get("data").then(function(res) {
			if (!res) {
				this.storage.setJson("data", this.initData);
				this.bufferData = this.initData;
				this.timerSwitcher.timersAmount = this.length;

				this.storage.setJson("settings", this.initSettings);
				this.bufferSettings = this.initSettings;
			} else {
				this.bufferData = JSON.parse(res);
				this.timerSwitcher.timersAmount = this.length;

				this.storage.getJson("settings").then(res => {
					this.bufferSettings = res;
				});
			}
			console.log('Complete init!(store)');
		}.bind(this));
	}

	// 获取所有数据
	getAll(): Promise<any> {
		if (this.bufferData) {
			return Promise.resolve(this.bufferData);
		} else {
			return this.storage.getJson("data");
		}
	}

	/**
	 * 获取指定数据（计时器）
	 * @param  {number}         id     数据（计时器）的id
	 * @param  {Array<string>}  field  查询的字段   
	 * @return {any}                   数据（计时器）的所有数据
	 */
	getData(id: number, field ? : Array < string > ): Promise < any > {
		if (id === 0) {
			id = this.timerSwitcher.getCurrentTimer();
		} else if (id > this.length){
			return Promise.resolve(-1);
		}
		if (this.bufferData) {
			let rt = {};
			if (!field) {
				return Promise.resolve(this.bufferData[id - 1]);
			} else {
				field.forEach(v => {
					rt[v] = this.bufferData[id - 1][v];
				});
				return Promise.resolve(rt);
			}
		} else {
			return new Promise((resolve, reject) => {
				this.getAll().then(res => {
					let rt = {};
					if (res) {
						if (!field) {
							resolve(res[id - 1]);
						} else {			
							field.forEach(v => {
								rt[v] = res[id - 1][v];
							});
							resolve(rt);
						}
					} else {
						if (!field) {
							resolve(this.initData[id - 1]);
						} else {
							field.forEach(v => {
								rt[v] = this.initData[id - 1][v];
							});
							resolve(rt);
						}
					}
				})
			});
		}
	}

	/**
	 * 设置数据（计时器）
	 * @param {number} id   数据（计时器）的id
	 * @param {Object} data 要更改的数据
	 */
	setData(id: number, data: {}): void {
		let initData = this.bufferData[id - 1],
			changedData = Object.assign(initData, data);
		this.bufferData[id - 1] = changedData;
		this.refreshDataId();
		this.storage.setJson("data", this.bufferData);
	}

	/**
	 * 增加一条数据（计时器）
	 * @param {any} data 
	 */
	addData(timer: Timer): void {
		this.bufferData.push(timer);
		this.refreshDataId();
		this.storage.setJson("data", this.bufferData);

		// 更新计时器切换器中的数量
		this.timerSwitcher.timersAmount += 1;
	}

	/**
	 * 移除数据（计时器）
	 * @param {number} id 数据（计时器）的id
	 */
	removeData(id: number): any {
		if (this.bufferData) {
			this.bufferData.splice(id - 1, 1);
			this.refreshDataId();
			this.storage.setJson("data", this.bufferData);

			// 更新计时器切换器中的数量
			this.timerSwitcher.timersAmount -= 1;
		} else {
			return -1;
		}
	}

	/**
	 * 在每次执行了删除、添加、或者跟id相关的操作时，更正id
	 */
	private refreshDataId(): any {
		if (this.bufferData) {
			this.bufferData.forEach((v, i) => {
				if (v.id !== i + 1) {
					this.bufferData[i].id = i + 1;
				}
			}, this);
		} else {
			return -1;
		}
	}

	/**
	 * 获取数据（计时器）的数量
	 * @return {number} 返回数量或-1
	 */
	get length(): number {
		if (this.bufferData) {
			return this.bufferData.length;
		} else {
			return -1;
		}
	}

	/**
	 * 获取设置数据
	 * @return {Promise<any>} 
	 */
	getSettings(): Promise<any> {
		if (this.bufferSettings) {
			return Promise.resolve(this.bufferSettings);
		} else {
			return this.storage.getJson("settings");
		}
	}

	/**
	 * 设置 设置数据
	 * @param  {string} key   数据名
	 * @param  {any} value 	  数据值
	 * @return {any}          [description]
	 */
	setSettings(key: string, value: any): any {
		if (this.bufferSettings) {
			this.bufferSettings[key] = value;
			this.storage.setJson("settings", this.bufferSettings);
		} else {
			return -1;
		}
	}

	// 上传数据至服务器
	upload(): any {

	}

	// 从服务器下载数据
	download(): any {

	}
}