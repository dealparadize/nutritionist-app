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

		/*this.groups = [
			{
				time: "Desayuno",
				foods: [
					{
						name: "Huevito con catsun",
						quantity: "200",
						unit: "gr",
						mode: "Guisado",
						img: "https://source.unsplash.com/featured/?{food},{egg}"
					},
					{
						name: "Fresa",
						quantity: "100",
						unit: "gr",
						mode: "Natural",
						img: "https://source.unsplash.com/featured/?{food},{strawberry}"
					},
					{
						name: "Pan",
						quantity: "300",
						unit: "gr",
						mode: "Tostado",
						img: "https://source.unsplash.com/featured/?{food},{bread}"
					}

				]
			},
			{
				time: "Colación",
				foods: [
					{
						name: "Zanahoria",
						quantity: "50",
						unit: "gr",
						mode: "Natural",
						img: "https://source.unsplash.com/featured/?{food},{carrot}"
					},
					{
						name: "Yogurt",
						quantity: "200",
						unit: "gr",
						mode: "Natural",
						img: "https://source.unsplash.com/featured/?{food},{yogurt}"
					}

				]
			},
			{
				time: "Comida",
				foods: [
					{
						name: "Pechuga",
						quantity: "400",
						unit: "gr",
						mode: "A la plancha",
						img: "https://source.unsplash.com/featured/?{food},{chicken}"
					},
					{
						name: "Lechuga",
						quantity: "200",
						unit: "gr",
						mode: "Natural",
						img: "https://source.unsplash.com/featured/?{food},{green}"
					},
					{
						name: "Arroz",
						quantity: "300",
						unit: "gr",
						mode: "Guisado",
						img: "https://source.unsplash.com/featured/?{food},{rice}"
					}
				]
			},
			{
				time: "Cena",
				foods: [
					{
						name: "Huevito con catsun",
						quantity: "200",
						unit: "gr",
						mode: "Guisado",
						img: "https://source.unsplash.com/featured/?{food},{egg}"
					},
					{
						name: "Platano",
						quantity: "100",
						unit: "gr",
						mode: "Natural",
						img: "https://source.unsplash.com/featured/?{food},{banana}"
					}
				]
			}
		]*/
	}
	getObjectMenu():any{
		let obj={	
			time:"",
			foods:[
				{
					name:"",
					quantity:"",
					unit:"",
				}
			]	
		}
		return obj;
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad TabDietPage');
		this.userProvider.getUser().then(datos => {
			//console.log(datos.user.menu_asignado[0])
			let obj={	
				time:"",
				foods:[
					
				]	
			};
			this.menuProvider.getUserMenu(datos.user.menu_asignado[0])
				.do(res => console.log())
				.map(res => res.json())
				.subscribe(data => {
					let f={	foodname:"",
						ingred:{
							name:"",
							quantity:"",
							unit:""
						}
					};
					//console.log(data.menu_user[0]);
					obj.time="Cena"
					//	console.log(data.menu_user[0].cena.idMenu.comidas[1].ingred.length);
					for (let i=0;i<=data.menu_user[0].cena.idMenu.comidas.length-1;i++){
						f.foodname=data.menu_user[0].cena.idMenu.comidas[i].nombre;
						for(let j=0;j<=data.menu_user[0].cena.idMenu.comidas[i].ingred.length-1;j++){
							f.ingred.name=data.menu_user[0].cena.idMenu.comidas[i].ingred[j]._id.nombre;
							f.ingred.quantity=data.menu_user[0].cena.idMenu.comidas[i].ingred[j]._id.porcion;
							f.ingred.unit=data.menu_user[0].cena.idMenu.comidas[i].ingred[j]._id.unitMeasure;
							console.log(f);
							obj.foods.push(f);
							f.ingred.name="";
							f.ingred.quantity="";
							f.ingred.unit="";
						}
					}
					console.log(obj)
					
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
