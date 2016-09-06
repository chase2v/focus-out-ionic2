import {
	Injectable
} from '@angular/core';
import {
	Http,
	Response
} from '@angular/http';

// 导入Rxjs操作符
import {Observable} from 'rxjs/observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TimerInfoService {

	constructor(private http: Http) {
		console.log('Run constructor!(TimerInfoService)');
	}

	getTimerInfos() {
		let getUrl = 'data/timerInfos.json';
		
		return this.http.get(getUrl)
			       .map(this.extractData)
			       .catch(this.handleError);
	}

	private extractData(res: Response): void {
		let data = res.json().data;
		return data || {};
	}

	private handleError(error: any) {

		return Observable.throw(error);
	}

	queryTimerInfo(id: number): any {
		let queryTimerInfoStream = new Subject(),
			rt = queryTimerInfoStream.asObservable;
		this.getTimerInfos().subscribe(res => {
			res.forEach(x => {
				if(x.id === id) {
					queryTimerInfoStream.next(x);
				}
			});
		});
		return queryTimerInfoStream;
	}
}