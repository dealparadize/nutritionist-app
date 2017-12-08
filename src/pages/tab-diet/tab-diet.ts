import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MenuProvider } from "../../providers/menu.provider";
import { UserProvider } from "../../providers/user.provider";
import { PantryProvider } from "../../providers/pantry.provider";
import * as moment from 'moment';
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
	moment = moment;
	despensa: any=[];
	groups: any = [];
	dietDate: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public userProvider: UserProvider,
		public menuProvider: MenuProvider,
		public pantryProvider: PantryProvider
	) {
		this.moment.locale('es');
		this.dietDate = this.moment(this.dietDate).format().substring(0,10);
	}

	ionViewWillEnter() {
		console.log(this.moment(new Date()).format().substring(0,10));
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
					this.pantryProvider.getUserPantryByDate(datos.user._id,this.dietDate)
						.do(res => console.log())
						.map(res => res.json())
						.subscribe(comidas =>{
							this.despensa=comidas.despensa;
							if(comidas.despensa.length==5){
								//se imprimen
								for(let k=0;k<=comidas.despensa.length-1;k++){
									this.getSelectedMenu(data.menu_user[0].desayuno,"Desayuno",comidas.despensa[k].menuId,0);
									this.getSelectedMenu(data.menu_user[0].colacion1,"Colacion1",comidas.despensa[k].menuId,1);
									this.getSelectedMenu(data.menu_user[0].comida,"Comida",comidas.despensa[k].menuId,2);
									this.getSelectedMenu(data.menu_user[0].colacion2,"Colacion2",comidas.despensa[k].menuId,3);
									this.getSelectedMenu(data.menu_user[0].cena,"Cena",comidas.despensa[k].menuId,4);
								}
								console.log(this.groups);
							} else{
								console.log("holaaaaaaa");
								
								this.getFirstMenu(data.menu_user[0].cena,"Desayuno")
								this.getFirstMenu(data.menu_user[0].cena,"Colacion1")
								this.getFirstMenu(data.menu_user[0].cena,"Comida")
								this.getFirstMenu(data.menu_user[0].cena,"Colacion2")
								this.getFirstMenu(data.menu_user[0].cena,"Cena")
								this.savePantry(this.groups[0],datos.user._id);
								this.savePantry(this.groups[1],datos.user._id);
								this.savePantry(this.groups[2],datos.user._id);
								this.savePantry(this.groups[3],datos.user._id);
								this.savePantry(this.groups[4],datos.user._id);
							}
							
						});
				});
			});
	}
	savePantry(obj,id){
		let o={"paciente":{"idComida": obj.foods[0]._id , "fecha":this.dietDate}}
		this.pantryProvider.savePantry(id,o)
		.do(res => console.log())
		.map(res => res.json())
		.subscribe(data => {
			console.log("registrado "+ obj.foods[0]._id);
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
			console.log(this.moment(data).format().substring(0,10))
			this.dietDate = this.moment(data).format().substring(0,10);
			this.load();
			
		});
		myDataChooserModal.present();
	}
	getFirstMenu(foodTime,name){
		var obj = {
			time: name,
			foods: []
		};
		var f = {
			foodname: "",
			_id: "",
			ingred: []
		};
		f.foodname = foodTime.idMenu.comidas[0].nombre;
		f._id = foodTime.idMenu.comidas[0]._id;
		for (let j = 0; j <= foodTime.idMenu.comidas[0].ingred.length - 1; j++) {
			f.ingred[j] = {
				name: foodTime.idMenu.comidas[0].ingred[j]._id.nombre,
				img: `https://source.unsplash.com/featured/?` + foodTime.idMenu.comidas[0].ingred[j]._id.nombre,
				quantity: foodTime.idMenu.comidas[0].ingred[j]._id.porcion,
				unit: foodTime.idMenu.comidas[0].ingred[j]._id.unitMeasure
			};
		}
		obj.foods.push(f);
		this.groups.push(obj);
		obj = {
			time: "",
			foods: []
		};
	}
	getSelectedMenu(foodTime,name,id,position){
		var obj = {
			time: "",
			foods: []
		};
		obj.time = name;
		for (let i = 0; i <= foodTime.idMenu.comidas.length - 1; i++) {
			if(foodTime.idMenu.comidas[i]._id==id){
				
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
						img: `https://source.unsplash.com/featured/?` + foodTime.idMenu.comidas[i].ingred[j]._id.nombre,
						unit: foodTime.idMenu.comidas[i].ingred[j]._id.unitMeasure
					};
				}
				obj.foods.push(f);
				this.groups[position]=obj;
			}
		}
		obj = {time: "",foods: []};

	}
}
