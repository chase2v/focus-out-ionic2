import { Injectable } from '@angular/core';

// 导入subject
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ShowCardService {
	
	constructor() { }

	private showCardStream = new Subject();

	showCardObservable = this.showCardStream.asObservable();

	showCard(): void {
		this.showCardStream.next("Show card!");
	}
}