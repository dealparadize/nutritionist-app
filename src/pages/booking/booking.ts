import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { UserProvider } from "../../providers/user.provider";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MessageProvider } from "../../providers/message.provider";
/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-booking',
	templateUrl: 'booking.html',
})
export class BookingPage {
	myForm: FormGroup;
	appointment: string;//2015-03-25T12:00:00Z
	hours = [];
	_userdata: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalController: ModalController,
		public formBuilder: FormBuilder,
		public modalCtrl: ModalController,
		public userProvider: UserProvider,
		public messageProvider: MessageProvider,
		public datePicker: DatePicker
	) {

		this.appointment = new Date().toISOString().slice(0, 10);
		this.myForm = formBuilder.group({
			hour: ['', Validators.compose([Validators.required])]
		});
	}
	openAppointmentDateChooser() {
		let modal = this.modalController.create('DateChooserModalPage', { data: { date: this.appointment, to: new Date(2030, 0, 1), from: new Date() } });
		modal.present();
		modal.onDidDismiss((data) => {
			//console.log(data);
			if (!data) return;
			this.appointment = new Date(data).toISOString().slice(0, 10);
			console.log("segundo " + this.appointment);
			this.userProvider.getAppointmentsForDate(this.appointment)	//para que se vuelve a reiniciar el date
				.do(res => console.log(res.json()))
				.map(res => res.json())
				.subscribe(data => {
					//console.log(data.appointment[1]);
					//console.log(this.filterHours(data.appointment));
					this.hours = this.filterHours(data.appointment);
					console.log(this.hours);
					//obtener el json con los que ya estan 	
					//
				});
		});
	}
	filterHours(reserved): string[] {
		let h = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
			"15:00", "15:30", "16:00", "16:30"];
		let i;
		reserved.forEach(hour => {
			i = h.indexOf(this.getHour(hour));
			if (i >= 0) {
				h.splice(i, 1);
			}
		});

		return h;
	}
	getHour(date): string {
		return date.slice(11, 16);
	}

	onRegister() {
		let obj2 = {
			cita: {
				fecha: this.appointment + 'T' + this.myForm.value.hour + ':00Z',
			}
		};
		console.log(obj2.cita.fecha);
		//crear cita
		console.log(this._userdata.idCita);
		this.userProvider.updateAppointment(this._userdata.idCita, obj2)
			.do(res => console.log(res.json()))
			.map(res => res.json())
			.subscribe(data => {
				this.messageProvider.toast("Cita actualizada exitósamente");

			}, err => {
				this.messageProvider.toast("Cita no actualiza exitósamente");
				console.log(err);
				console.log(err.json());
			});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BookingPage');
		this.userProvider.getUser().then(datos => {
			console.log("userinstorage");
			console.log(datos.user);
			this._userdata = datos.user;
			this.userProvider.api.setTokenHeader(datos.token);

		});
	}

}
