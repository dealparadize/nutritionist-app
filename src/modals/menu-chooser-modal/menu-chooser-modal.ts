import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from "../../providers/user.provider";
import { MenuProvider } from "../../providers/menu.provider";
/**
 * Generated class for the MenuChooserModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-menu-chooser-modal',
	templateUrl: 'menu-chooser-modal.html',
})
export class MenuChooserModalPage {
	groups: any = [];
	

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public userProvider: UserProvider,
		public menuProvider: MenuProvider
	) {
		console.log("initialize NewItemModal")

	}

	closeDateChooser() {
		this.viewCtrl.dismiss();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MenuChooserModalPage');
		var tiempoComida = this.navParams.get("data");

		this.userProvider.getUser().then(datos => {
			var obj = {
				time: "",
				foods: []
			};

			this.menuProvider.getUserMenu(datos.user.menu_asignado[0])
				.do(res => console.log())
				.map(res => res.json())
				.subscribe(data => {
					switch(tiempoComida){
						case "Desayuno":
							for (let i = 0; i <= data.menu_user[0].desayuno.idMenu.comidas.length - 1; i++) {
								var f = {
									foodname: "",
									_id: data.menu_user[0].desayuno.idMenu.comidas[i]._id,
									ingred: []
								};
								f.foodname = data.menu_user[0].desayuno.idMenu.comidas[i].nombre;
								for (let j = 0; j <= data.menu_user[0].desayuno.idMenu.comidas[i].ingred.length - 1; j++) {
									f.ingred[j] = {
										name: data.menu_user[0].desayuno.idMenu.comidas[i].ingred[j]._id.nombre,
										quantity: data.menu_user[0].desayuno.idMenu.comidas[i].ingred[j]._id.porcion,
										unit: data.menu_user[0].desayuno.idMenu.comidas[i].ingred[j]._id.unitMeasure
									};
		
								}
								this.groups[i] = f;
							}
							console.log(this.groups);
						break;
						case "Colacion1":
							for (let i = 0; i <= data.menu_user[0].colacion1.idMenu.comidas.length - 1; i++) {
								var f = {
									foodname: "",
									_id: data.menu_user[0].colacion1.idMenu.comidas[i]._id,
									ingred: []
								};
								f.foodname = data.menu_user[0].colacion1.idMenu.comidas[i].nombre;
								for (let j = 0; j <= data.menu_user[0].colacion1.idMenu.comidas[i].ingred.length - 1; j++) {
									f.ingred[j] = {
										name: data.menu_user[0].colacion1.idMenu.comidas[i].ingred[j]._id.nombre,
										quantity: data.menu_user[0].colacion1.idMenu.comidas[i].ingred[j]._id.porcion,
										unit: data.menu_user[0].colacion1.idMenu.comidas[i].ingred[j]._id.unitMeasure
									};
		
								}
								this.groups[i] = f;
							}
							console.log(this.groups);
						break;
						case "Comida":
							for (let i = 0; i <= data.menu_user[0].comida.idMenu.comidas.length - 1; i++) {
								var f = {
									foodname: "",
									_id: data.menu_user[0].comida.idMenu.comidas[i]._id,
									ingred: []
								};
								f.foodname = data.menu_user[0].comida.idMenu.comidas[i].nombre;
								for (let j = 0; j <= data.menu_user[0].comida.idMenu.comidas[i].ingred.length - 1; j++) {
									f.ingred[j] = {
										name: data.menu_user[0].comida.idMenu.comidas[i].ingred[j]._id.nombre,
										quantity: data.menu_user[0].comida.idMenu.comidas[i].ingred[j]._id.porcion,
										unit: data.menu_user[0].comida.idMenu.comidas[i].ingred[j]._id.unitMeasure
									};
		
								}
								this.groups[i] = f;
							}
							console.log(this.groups);
						break;
						case "Colacion2":
							for (let i = 0; i <= data.menu_user[0].colacion2.idMenu.comidas.length - 1; i++) {
								var f = {
									foodname: "",
									_id: data.menu_user[0].colacion2.idMenu.comidas[i]._id,
									ingred: []
								};
								f.foodname = data.menu_user[0].colacion2.idMenu.comidas[i].nombre;
								for (let j = 0; j <= data.menu_user[0].colacion2.idMenu.comidas[i].ingred.length - 1; j++) {
									f.ingred[j] = {
										name: data.menu_user[0].colacion2.idMenu.comidas[i].ingred[j]._id.nombre,
										quantity: data.menu_user[0].colacion2.idMenu.comidas[i].ingred[j]._id.porcion,
										unit: data.menu_user[0].colacion2.idMenu.comidas[i].ingred[j]._id.unitMeasure
									};
		
								}
								this.groups[i] = f;
							}
							console.log(this.groups);
						break;
						case "Cena":
							for (let i = 0; i <= data.menu_user[0].cena.idMenu.comidas.length - 1; i++) {
								var f = {
									foodname: "",
									_id: data.menu_user[0].cena.idMenu.comidas[i]._id,
									ingred: []
								};
								f.foodname = data.menu_user[0].cena.idMenu.comidas[i].nombre;
								for (let j = 0; j <= data.menu_user[0].cena.idMenu.comidas[i].ingred.length - 1; j++) {
									f.ingred[j] = {
										name: data.menu_user[0].cena.idMenu.comidas[i].ingred[j]._id.nombre,
										quantity: data.menu_user[0].cena.idMenu.comidas[i].ingred[j]._id.porcion,
										unit: data.menu_user[0].cena.idMenu.comidas[i].ingred[j]._id.unitMeasure
									};
		
								}
								this.groups[i] = f;
							}
							console.log(this.groups);
						break;
					}

				});
		});
	}

}
