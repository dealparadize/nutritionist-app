import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user.provider";
// import { LocalNotifications } from '@ionic-native/local-notifications';

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
	talla: any = "";

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
		{ name: "Pantorrilla", value: "" },
		{ name: "Muñeca", value: "" }
	];

	items: Array<any> = [];

	constructor(
		public navCtrl: NavController,
		// public localNotifications: LocalNotifications,
		public navParams: NavParams,
		public userProvider: UserProvider
	) {
	}

	openChart() {
		this.navCtrl.push('ChartTestPage');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TabTracePage');
		// this.localNotifications.schedule({
		// 	text: 'Alarm has expired!',
		// 	at: new Date(new Date().getTime() + 6000),
		// 	//sound: isAndroid ? 'file://sound.mp3': 'file://beep.caf',
		// 	data: { message : 'json containing app-specific information to be posted when alarm triggers' }
		//  });
		let obj: { name: "", value: "" };
		this.userProvider.getUser().then(datos => {
			this.userData = datos.user;
			this.userProvider.getFirstLastAppointmentRegisterData(datos.user._id)
				.do(res => console.log(res.json()))
				.map(res => res.json())
				.subscribe(data => {
					console.log(data);
					this.peso = data.registrodecita[data.registrodecita.length - 1].peso;
					this.talla = data.registrodecita[data.registrodecita.length - 1].talla;

					let i = 0;
					for (var p in data.registrodecita[data.registrodecita.length - 1].mediciones.pliegues) {
						this.pliegues[i].value = data.registrodecita[data.registrodecita.length - 1].mediciones.pliegues[p];
						i++;
					}
					i = 0;
					for (var c in data.registrodecita[data.registrodecita.length - 1].mediciones.cirfunferencias) {
						console.log(data.registrodecita[data.registrodecita.length - 1].mediciones.cirfunferencias[c])
						this.circunferencia[i].value = data.registrodecita[data.registrodecita.length - 1].mediciones.cirfunferencias[c];
						i++;
					}
				})
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
