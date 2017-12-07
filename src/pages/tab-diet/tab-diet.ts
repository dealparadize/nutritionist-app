import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MenuProvider } from "../../providers/menu.provider";
import { UserProvider } from "../../providers/user.provider";
/**
 * Generated class for the TabDietPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-tab-diet',
	templateUrl: 'tab-diet.html',
})
export class TabDietPage {

	groups: any = [];
	dietDate: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public userProvider: UserProvider,
		public menuProvider: MenuProvider
	) {
		this.dietDate=new Date().toISOString().slice(0, 10);
	}
	
	getObjectMenu(): any {
		let obj = {
			time: "",
			foods: [
				{
					name: "",
					quantity: "",
					unit: "",
				}
			]
		}
		return obj;
	}

	ionViewWillEnter() {
		this.load();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TabDietPage');

	}

	load() {
		this.userProvider.getUser().then(datos => {
			var obj = {
				time: "",
				foods: []
			};
			
			this.menuProvider.getUserMenu(datos.user.menu_asignado[0])
				.do(res => console.log())
				.map(res => res.json())
				.subscribe(data => {
					obj.time = "Desayuno"
					var f = {
						foodname: "",
						_id: "",
						ingred: []
					};
					f.foodname=data.menu_user[0].desayuno.idMenu.comidas[0].nombre;
					f._id=data.menu_user[0].desayuno.idMenu.comidas[0]._id;
					for (let j = 0; j <= data.menu_user[0].desayuno.idMenu.comidas[0].ingred.length - 1; j++) {
						f.ingred[j]={
							name: data.menu_user[0].desayuno.idMenu.comidas[0].ingred[j]._id.nombre,
							quantity: data.menu_user[0].desayuno.idMenu.comidas[0].ingred[j]._id.porcion,
							unit: data.menu_user[0].desayuno.idMenu.comidas[0].ingred[j]._id.unitMeasure
						};
					}
					obj.foods.push(f);
					this.groups.push(obj);
					obj = {
						time: "",
						foods: []
					};
					///////////////////////////////////////////////////////////////////////////////
					obj.time = "Colacion1"
					f = {
						foodname: "",
						_id: "",
						ingred: []
					};
					f.foodname=data.menu_user[0].colacion1.idMenu.comidas[0].nombre;
					f._id=data.menu_user[0].colacion1.idMenu.comidas[0]._id;
					for (let j = 0; j <= data.menu_user[0].colacion1.idMenu.comidas[0].ingred.length - 1; j++) {
						f.ingred[j]={
							name: data.menu_user[0].colacion1.idMenu.comidas[0].ingred[j]._id.nombre,
							quantity: data.menu_user[0].colacion1.idMenu.comidas[0].ingred[j]._id.porcion,
							unit: data.menu_user[0].colacion1.idMenu.comidas[0].ingred[j]._id.unitMeasure
						};
					}
					obj.foods.push(f);
					this.groups.push(obj);
					obj = {
						time: "",
						foods: []
					};
					///////////////////////////////////////////////////////////////////////////////
					obj.time = "Comida"
					f = {
						foodname: "",
						_id: "",
						ingred: []
					};
					f.foodname=data.menu_user[0].comida.idMenu.comidas[0].nombre;
					f._id=data.menu_user[0].comida.idMenu.comidas[0]._id;
					for (let j = 0; j <= data.menu_user[0].comida.idMenu.comidas[0].ingred.length - 1; j++) {
						f.ingred[j]={
							name: data.menu_user[0].comida.idMenu.comidas[0].ingred[j]._id.nombre,
							quantity: data.menu_user[0].comida.idMenu.comidas[0].ingred[j]._id.porcion,
							unit: data.menu_user[0].comida.idMenu.comidas[0].ingred[j]._id.unitMeasure
						};
					}
					obj.foods.push(f);
					this.groups.push(obj);
					obj = {
						time: "",
						foods: []
					};
					///////////////////////////////////////////////////////////////////////////////
					obj.time = "Colacion2"
					f = {
						foodname: "",
						_id: "",
						ingred: []
					};
					f.foodname=data.menu_user[0].colacion2.idMenu.comidas[0].nombre;
					f._id=data.menu_user[0].colacion2.idMenu.comidas[0]._id;
					for (let j = 0; j <= data.menu_user[0].colacion2.idMenu.comidas[0].ingred.length - 1; j++) {
						f.ingred[j]={
							name: data.menu_user[0].colacion2.idMenu.comidas[0].ingred[j]._id.nombre,
							quantity: data.menu_user[0].colacion2.idMenu.comidas[0].ingred[j]._id.porcion,
							unit: data.menu_user[0].colacion2.idMenu.comidas[0].ingred[j]._id.unitMeasure
						};
					}
					obj.foods.push(f);
					this.groups.push(obj);
					obj = {
						time: "",
						foods: []
					};
					///////////////////////////////////////////////////////////////////////////////
					obj.time = "Cena"
					f = {
						foodname: "",
						_id: "",
						ingred: []
					};
					f.foodname=data.menu_user[0].cena.idMenu.comidas[0].nombre;
					f._id=data.menu_user[0].cena.idMenu.comidas[0]._id;
					for (let j = 0; j <= data.menu_user[0].cena.idMenu.comidas[0].ingred.length - 1; j++) {
						f.ingred[j]={
							name: data.menu_user[0].cena.idMenu.comidas[0].ingred[j]._id.nombre,
							quantity: data.menu_user[0].cena.idMenu.comidas[0].ingred[j]._id.porcion,
							unit: data.menu_user[0].cena.idMenu.comidas[0].ingred[j]._id.unitMeasure
						};
					}
					obj.foods.push(f);
					this.groups.push(obj);
					obj = {
						time: "",
						foods: []
					};
				});
		});
	}

	chooseMenu(foodType) {
		console.log(foodType)
		let myDataChooserModal = this.modalCtrl.create('MenuChooserModalPage', { data: foodType });
		myDataChooserModal.onDidDismiss(data => {
			console.log(data);
		});
		myDataChooserModal.present();
	}

	openDateChooser() {
		let myDataChooserModal = this.modalCtrl.create('DateChooserModalPage', { data: { date: this.dietDate, to: new Date(2030, 0, 1), from: new Date() } });
		myDataChooserModal.onDidDismiss(data => {
			console.log(this.dietDate)
		});
		myDataChooserModal.present();
	}

}
