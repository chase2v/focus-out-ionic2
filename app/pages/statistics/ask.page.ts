import {
	Component,
	OnInit
} from '@angular/core';
import {
	NavController,
	ModalController
} from 'ionic-angular';

// 导入子modal
import {
	SignUpModal
} from './signUp.modal';
import {
	LoginModal
} from './login.modal';

@Component({
	templateUrl: 'build/pages/statistics/ask.html'
})
export class AskPage implements OnInit {
	constructor(private navCtrl: NavController, private modalCtrl: ModalController) {}

	ngOnInit() {}

	close() {
		this.navCtrl.pop();

		localStorage.setItem("needCloud","false");
	}

	signUp() {
		let modal = this.modalCtrl.create(SignUpModal);
		modal.present();
	}

	login() {
		let modal = this.modalCtrl.create(LoginModal);
		modal.present();
	}
}