import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from "../../providers/user.provider";
import { PantryProvider } from "../../providers/pantry.provider";
import * as moment from 'moment';
/**
 * Generated class for the PantryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-pantry',
	templateUrl: 'pantry.html',
})
export class PantryPage {
	items: Array<any> = []
	pantryDate:any;
	moment= moment;
	checks:Array<any> = [];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public userProvider: UserProvider,
		public pantryProvider: PantryProvider
	) {
		this.moment.locale('es');
		this.pantryDate = this.moment(this.pantryDate).format().substring(0,10);
	}

	ionViewWillEnter() {
		this.load();
	}

	saveChecked(i, event){
		//console.log(event);
		this.pantryProvider.setPantryItem(this.pantryDate, this.items.length, i, event.value).then(data=>{
			this.load();
		})
		;
	}

	getChecked(){
		this.pantryProvider.getPantryItems(this.pantryDate)
			.then(data=>{
				console.log(data);
				this.checks=data;
				console.log(this.checks);
			});
	}

	load() {
		this.userProvider.getUser().then(datos => {
			this.pantryProvider.getUserPantryIngredsByDate(datos.user._id,this.pantryDate)
			.do(res => console.log(res.json()))
			.map(res => res.json())
			.subscribe(data => {
				this.items=data.despensa;
				this.getChecked();
			});
		})
		//this.getChecked();
	}

	openDateChooser() {
		let myDataChooserModal = this.modalCtrl.create('DateChooserModalPage', { data: { date: this.pantryDate, to: new Date(2030, 0, 1), from: new Date() } });
		myDataChooserModal.onDidDismiss(data => {
			this.pantryDate = this.moment(data).format().substring(0,10);	
			this.load();		
		});
		myDataChooserModal.present();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PantryPage');
	}

}
