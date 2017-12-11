import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from "../../providers/user.provider";
import { MenuProvider } from "../../providers/menu.provider";
import { PantryProvider } from "../../providers/pantry.provider";
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
	dietDate: any;
	idUser: any;
	deletedFood: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public userProvider: UserProvider,
		public menuProvider: MenuProvider,
		public pantryProvider: PantryProvider
	) {
		console.log("initialize NewItemModal")

	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	closeDateChooser(idNewFood: any) {

		let obj = { "paciente": { "idComida": this.deletedFood, "fecha": this.dietDate } };
		 this.pantryProvider.deletePantryElementByDate(this.idUser, obj)
		 	.do(res => console.log())
		 	.map(res => res.json())
		 	.subscribe(data => {
		 		var obj2={"paciente":{"idComida":idNewFood, "fecha":this.dietDate}};
		 		this.pantryProvider.savePantry(this.idUser,obj2)
		 			.do(res => console.log())
		 			.map(res => res.json())
		 			.subscribe(data => {
		 				console.log("actualizado prro");

		 				this.viewCtrl.dismiss();
		 			});
		 	});


	}



	ionViewDidLoad() {
		console.log('ionViewDidLoad MenuChooserModalPage');

		var datos = this.navParams.get("data");

		var tiempoComida = datos.foodType;
		this.dietDate = datos.date;
		this.idUser = datos.idUs;
		this.deletedFood = datos.oldFood[0]._id;
		console.log(this.deletedFood);

		this.userProvider.getUser().then(datos => {
			this.menuProvider.getUserMenu(datos.user.menu_asignado[0])
				.do(res => console.log())
				.map(res => res.json())
				.subscribe(data => {
					switch (tiempoComida) {
						case "Desayuno":
							this.getMenuByType(data.menu_user[0].desayuno)
							break;
						case "Colacion1":
							this.getMenuByType(data.menu_user[0].colacion1)
							break;
						case "Comida":
							this.getMenuByType(data.menu_user[0].comida)
							break;
						case "Colacion2":
							this.getMenuByType(data.menu_user[0].colacion2)
							break;
						case "Cena":
							this.getMenuByType(data.menu_user[0].cena)
							break;
					}

				});
		});
	}

	getMenuByType(foodTime) {
		var obj = {
			time: "",
			foods: []
		};
		for (let i = 0; i <= foodTime.idMenu.comidas.length - 1; i++) {
			var f = {
				foodname: "",
				_id: foodTime.idMenu.comidas[i]._id,
				ingred: []
			};
			f.foodname = foodTime.idMenu.comidas[i].nombre;
			for (let j = 0; j <= foodTime.idMenu.comidas[i].ingred.length - 1; j++) {
				f.ingred[j] = {
					name: foodTime.idMenu.comidas[i].ingred[j]._id.nombre,
					quantity: foodTime.idMenu.comidas[i].ingred[j]._id.porcion,
					unit: foodTime.idMenu.comidas[i].ingred[j]._id.unitMeasure
				};

			}
			this.groups[i] = f;
		}
		console.log(this.groups);
	}
}
