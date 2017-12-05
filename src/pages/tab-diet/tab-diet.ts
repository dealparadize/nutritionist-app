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


	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public userProvider: UserProvider,
		public menuProvider: MenuProvider
	) {

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
					for (let i = 0; i <= data.menu_user[0].desayuno.idMenu.comidas.length - 1; i++) {
						var f = {
							foodname: "",
							_id: data.menu_user[0].desayuno.idMenu.comidas[i]._id,
							ingred: []
						};
						f.foodname = data.menu_user[0].desayuno.idMenu.comidas[i].nombre;
						for (let j = 0; j <= data.menu_user[0].desayuno.idMenu.comidas[i].ingred.length - 1; j++) {
							f.ingred[j]={
								name: data.menu_user[0].desayuno.idMenu.comidas[i].ingred[j]._id.nombre,
								quantity: data.menu_user[0].desayuno.idMenu.comidas[i].ingred[j]._id.porcion,
								unit: data.menu_user[0].desayuno.idMenu.comidas[i].ingred[j]._id.unitMeasure
							};
							
						}
						obj.foods[i]=f;
					}
					this.groups.push(obj);
					obj = {
						time: "",
						foods: []
					};
					///////////////////////////////////////////////////////////////////////////////
					obj.time = "Colacion1"
					for (let i = 0; i <= data.menu_user[0].colacion1.idMenu.comidas.length - 1; i++) {
						var f = {
							foodname: "",
							_id: data.menu_user[0].colacion1.idMenu.comidas[i]._id,
							ingred: []
						};
						f.foodname = data.menu_user[0].colacion1.idMenu.comidas[i].nombre;
						for (let j = 0; j <= data.menu_user[0].colacion1.idMenu.comidas[i].ingred.length - 1; j++) {
							f.ingred[j]={
								name: data.menu_user[0].colacion1.idMenu.comidas[i].ingred[j]._id.nombre,
								quantity: data.menu_user[0].colacion1.idMenu.comidas[i].ingred[j]._id.porcion,
								unit: data.menu_user[0].colacion1.idMenu.comidas[i].ingred[j]._id.unitMeasure
							};
							
						}
						obj.foods[i]=f;
					}
					this.groups.push(obj);
					obj = {
						time: "",
						foods: []
					};
					///////////////////////////////////////////////////////////////////////////////
					obj.time = "Comida"
					for (let i = 0; i <= data.menu_user[0].comida.idMenu.comidas.length - 1; i++) {
						var f = {
							foodname: "",
							_id: data.menu_user[0].comida.idMenu.comidas[i]._id,
							ingred: []
						};
						f.foodname = data.menu_user[0].comida.idMenu.comidas[i].nombre;
						for (let j = 0; j <= data.menu_user[0].comida.idMenu.comidas[i].ingred.length - 1; j++) {
							f.ingred[j]={
								name: data.menu_user[0].comida.idMenu.comidas[i].ingred[j]._id.nombre,
								quantity: data.menu_user[0].comida.idMenu.comidas[i].ingred[j]._id.porcion,
								unit: data.menu_user[0].comida.idMenu.comidas[i].ingred[j]._id.unitMeasure
							};
							
						}
						obj.foods[i]=f;
					}
					this.groups.push(obj);
					obj = {
						time: "",
						foods: []
					};
					///////////////////////////////////////////////////////////////////////////////
					obj.time = "Colacion2"
					for (let i = 0; i <= data.menu_user[0].colacion2.idMenu.comidas.length - 1; i++) {
						var f = {
							foodname: "",
							_id: data.menu_user[0].colacion2.idMenu.comidas[i]._id,
							ingred: []
						};
						f.foodname = data.menu_user[0].colacion2.idMenu.comidas[i].nombre;
						for (let j = 0; j <= data.menu_user[0].colacion2.idMenu.comidas[i].ingred.length - 1; j++) {
							f.ingred[j]={
								name: data.menu_user[0].colacion2.idMenu.comidas[i].ingred[j]._id.nombre,
								quantity: data.menu_user[0].colacion2.idMenu.comidas[i].ingred[j]._id.porcion,
								unit: data.menu_user[0].colacion2.idMenu.comidas[i].ingred[j]._id.unitMeasure
							};
							
						}
						obj.foods[i]=f;
					}
					this.groups.push(obj);
					obj = {
						time: "",
						foods: []
					};
					///////////////////////////////////////////////////////////////////////////////
					obj.time = "Cena"
					for (let i = 0; i <= data.menu_user[0].cena.idMenu.comidas.length - 1; i++) {
						var f = {
							foodname: "",
							_id: data.menu_user[0].cena.idMenu.comidas[i]._id,
							ingred: []
						};
						f.foodname = data.menu_user[0].cena.idMenu.comidas[i].nombre;
						for (let j = 0; j <= data.menu_user[0].cena.idMenu.comidas[i].ingred.length - 1; j++) {
							f.ingred[j]={
								name: data.menu_user[0].cena.idMenu.comidas[i].ingred[j]._id.nombre,
								quantity: data.menu_user[0].cena.idMenu.comidas[i].ingred[j]._id.porcion,
								unit: data.menu_user[0].cena.idMenu.comidas[i].ingred[j]._id.unitMeasure
							};
							
						}
						obj.foods[i]=f;
					}
					this.groups.push(obj);
					obj = {
						time: "",
						foods: []
					};
					


					console.log(this.groups);

				});
		});
	}

	chooseMenu() {
		let myDataChooserModal = this.modalCtrl.create('MenuChooserModalPage', { data: "No data" });
		myDataChooserModal.onDidDismiss(data => {
			console.log(data);
		});
		myDataChooserModal.present();
	}

	openDateChooser() {
		let myDataChooserModal = this.modalCtrl.create('DateChooserModalPage', { data: { pickMode: 'single' } });
		myDataChooserModal.onDidDismiss(data => {
			console.log(data);
		});
		myDataChooserModal.present();
	}

}
