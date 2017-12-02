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
	peso: any = "";
	tipo: any = "";

	pliegues: Array<any> = [
		{ name: "Tricipital", value: "" },
		{ name: "sEscapulada", value: "" },
		{ name: "Bicapital", value: "" },
		{ name: "Seliaco", value: "" },
		{ name: "Sespinaje", value: "" },
		{ name: "Abdominal", value: "" },
		{ name: "Muslo", value: "" },
		{ name: "Pantorrilla", value: "" }];
	circunferencia: Array<any> = [
		{ name: "Brazo", value: "" },
		{ name: "Cintura", value: "" },
		{ name: "Cadera", value: "" },
		{ name: "Brazo contorno", value: "" },
		{ name: "Muslo", value: "" },
		{ name: "Pantorrilla", value: "" }];
	items: Array<any> = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
	}

	openChart() {
		this.navCtrl.push('ChartTestPage');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TabTracePage');
		let obj: { name: "", value: "" };
		this.userProvider.getUser().then(datos => {
			console.log("userinstorage");
			console.log(datos.user);
			this.userData = datos.user;
			this.userProvider.api.setTokenHeader(datos.token);
			this.userProvider.getAppointmentRegisterData(datos.user.idCita)
				.do(res => console.log(res.json()))
				.map(res => res.json())
				.subscribe(data => {
					console.log(data);
					this.peso = data.registrodecita[0].peso;
					this.tipo = data.registrodecita[0].tipo;

					let i = 0;
					for (var p in data.registrodecita[0].mediciones.pliegues) {
						this.pliegues[i].value = data.registrodecita[0].mediciones.pliegues[p];
						i++;
					}
					i = 0;
					for (var c in data.registrodecita[0].mediciones.cirfunferencias) {
						console.log(data.registrodecita[0].mediciones.cirfunferencias[c])
						this.circunferencia[i].value = data.registrodecita[0].mediciones.cirfunferencias[c];
						i++;
					}
					//console.log(this.pliegues);

				});
		});
		//console.log(this.userData.idCita);
		/*this.userProvider.getAppointmentRegisterData(this.userData.idCita)
		.do(res => console.log(res.json()))
		.map(res => res.json())
		.subscribe(data => {
			console.log(data);
		});*/


	}

}
