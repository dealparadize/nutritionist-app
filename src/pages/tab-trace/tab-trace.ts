import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user.provider";
/**
 * Generated class for the TabTracePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-tab-trace',
	templateUrl: 'tab-trace.html',
})
export class TabTracePage {
	userData: any;
	peso:any="";
	talla:any="";
	pliegues:Array<any>=[];
	qpliegues:Array<any>=[
		{name:"Tricipital",value:""},
		{name:"sEscapulada",value:""},
		{name:"Bicapital",value:""},
		{name:"Seliaco",value:""},
		{name:"Sespinaje",value:""},
		{name:"Abdominal",value:""},
		{name:"Muslo",value:""},
		{name:"Pantorrilla",value:""}];
	circunferencia:Array<any>=[];
	acircunferencia:Array<any>=[
		{name:"Brazo",value:""},
		{name:"Cintura",value:""},
		{name:"Cadera",value:""},
		{name:"Brazo contorno",value:""},
		{name:"Muslo",value:""},
		{name:"Pantorrilla",value:""}];
	items: Array<any> = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
	}

	openChart() {
		this.navCtrl.push('ChartTestPage');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TabTracePage');
		let obj={name:"",value:""};
		this.userProvider.getUser().then(datos => {
			this.userData=datos.user;
			this.userProvider.api.setTokenHeader(datos.token);
			this.userProvider.getAppointmentRegisterData(datos.user.idCita)
			.do(res => console.log(res.json()))
			.map(res => res.json())
			.subscribe(data => {
				console.log(data);
				this.peso=data.registrodecita[0].peso;
				this.talla=data.registrodecita[0].talla;
				for(var p in data.registrodecita[0].mediciones.pliegues){
					this.pliegues.push({name:p+"",value:data.registrodecita[0].mediciones.pliegues[p]});
				}
				for(var c in data.registrodecita[0].mediciones.cirfunferencias){
					this.circunferencia.push({name:c+"",value:data.registrodecita[0].mediciones.cirfunferencias[c]});
				}
			});
		  });
	}

}
