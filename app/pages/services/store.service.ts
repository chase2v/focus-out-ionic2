import {
	Injectable
} from '@angular/core';
import {
	Storage,
	SqlStorage
} from 'ionic-angular';

@Injectable()
export class StoreService {

	// 数据库
	private storage: Storage;

	// 初始数据
	private initData = [{
		"name": "study",
		"id": 1,
		"type": "default",
		"target": 5,
		"theme": "default",
		"timeSet": {
			"unit": 20,
			"work": 25,
			"break": 5,
			"workUnit": "minutes",
			"breakUnit": "minutes"
		}
	}, {
		"name": "read",
		"id": 2,
		"type": "default",
		"target": 2,
		"theme": "default",
		"timeSet": {
			"unit": 20,
			"work": 30,
			"break": 5,
			"workUnit": "minutes",
			"breakUnit": "minutes"
		}
	}, {
		"name": "sport",
		"id": 3,
		"type": "default",
		"target": 2,
		"theme": "default",
		"timeSet": {
			"unit": 20,
			"work": 20,
			"break": 10,
			"workUnit": "minutes",
			"breakUnit": "minutes"
		}
	}];
	// 初始设置
	private initSettings = {
		isSync: false
	}

	// 缓存数据
	private bufferData: any;
	// 缓存设置数据
	private bufferSettings: any;

	constructor() {
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

				this.storage.setJson("settings", this.initSettings);
				this.bufferSettings = this.initSettings;
			} else {
				this.bufferData = JSON.parse(res);

				this.storage.getJson("settings").then(res => {
					this.bufferSettings = res;
				});
			}
			console.log('Complete init!(store)');
		}.bind(this));
	}

	// 获取所有数据
	getAll(): any {
		if (this.bufferData) {
			return Promise.resolve(this.bufferData);
		} else {
			return this.storage.getJson("data");
		}
	}

	/**
	 * 获取指定数据（计时器）
	 * @param  {number} id 数据（计时器）的id
	 * @return {any}       数据（计时器）的所有数据
	 */
	getData(id: number): Promise<any> {
		if (this.bufferData) {
			return Promise.resolve(this.bufferData[id - 1]);
		} else {
			return new Promise((resolve,reject) => {
				this.getAll().then(res => {
					if(res) {
						resolve(res[id-1]);
					} else {
						resolve(this.initData[id -1]);
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
	setData(id: number, data: any): void {
		debugger
		let initData = this.bufferData[id - 1],
			timeSetChanged;
		let changedData = Object.assign(initData, data);
		if (data.hasOwnProperty("timeSet")) {
			changedData.timeSet = Object.assign(initData.timeSet, data.timeSet);
		}
		this.bufferData[id - 1] = changedData;
		this.storage.setJson("data", this.bufferData);
		this.refreshDataId();
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
	 * @return {any} 
	 */
	getSettings(): Promise < any > {
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