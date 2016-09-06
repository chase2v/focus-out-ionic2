import { Component, OnInit } from '@angular/core';
import {ViewController,ModalController} from 'ionic-angular';
      
@Component({
	templateUrl: 'build/pages/statistics/signUp.html'
})
export class SignUpModal implements OnInit {
	constructor(private viewCtrl: ViewController,private modalCtrl: ModalController) { }

	ngOnInit() { }

	close() {
		this.viewCtrl.dismiss();
	}
}