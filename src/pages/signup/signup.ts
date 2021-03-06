import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserProvider } from "../../providers/user.provider";
import { ToastController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {

	myForm: FormGroup;
	_next: boolean = false;
	myDate: string;
	appointment: string;//2015-03-25T12:00:00Z
	/*hours=[{hour:"09:00"},{hour:"09:30"},{hour:"10:00"},{hour:"10:30"},{hour:"11:00"},{hour:"11:30"}
			,{hour:"12:00"},{hour:"12:30"},{hour:"13:00"},{hour:"13:30"},{hour:"14:00"},{hour:"14:30"}
			,{hour:"15:00"},{hour:"15:30"},{hour:"16:00"},{hour:"16:30"}];*/
	/*hours=["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30",
			"15:00","15:30","16:00","16:30"];*/
	hours = [];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public formBuilder: FormBuilder,
		public modalController: ModalController,
		public userProvider: UserProvider,
		private oneSignal: OneSignal,
		public toastCtrl: ToastController
	) {
		this.myDate = new Date(1971, 0, 1).toISOString().slice(0, 10);
		this.appointment = new Date().toISOString().slice(0, 10);
		this.myForm = formBuilder.group({
			name: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
			lastname: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
			lastname2: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
			email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
			phone: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern(/^\d+$/)])],
			gender: ['m', Validators.compose([Validators.required])],
			// date: ['', Validators.compose([Validators.required])],
			q1: ['', Validators.compose([Validators.required])],
			q2: ['', Validators.compose([])],
			q3: ['', Validators.compose([])],
			q4: ['', Validators.compose([])],
			q5: ['', Validators.compose([])],
			hour: ['', Validators.compose([Validators.required])]
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
		this.userProvider.getUser().then(datos => {
			console.log("userinstorage");
			//console.log(datos.user._id);
			//this.userProvider.api.setTokenHeader(datos.token);
			
		  });
	}
	openDateChooser() {
		console.log(this.myDate)
		let modal = this.modalController.create('DateChooserModalPage', { data: { date: this.myDate, to: new Date(2012, 0, 1), from: new Date(1970, 0, 1) } });
		modal.present();
		modal.onDidDismiss((data) => {
			console.log(data);
			if (!data) return;
			this.myDate = new Date(data).toISOString().slice(0, 10);
		});
	}
	//aqui se obtiene las horas y se genera el nuevo arreglo para el select
	openAppointmentDateChooser() {
		let modal = this.modalController.create('DateChooserModalPage', { data: { date: this.appointment, to: new Date(2030, 0, 1), from: new Date() } });
		modal.present();
		modal.onDidDismiss((data) => {
			//console.log(data);
			if (!data) return;
			this.appointment = new Date(data).toISOString().slice(0, 10);
			console.log("segundo " + this.appointment);
			this.userProvider.getAppointmentsForDate(this.appointment)	//para que se vuelve a reiniciar el date
				.do(res => console.log())
				.map(res => res.json())
				.subscribe(data => {
					//console.log(data.appointment[1]);
					console.log(this.filterHours(data.appointment));
					this.hours = this.filterHours(data.appointment);
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
	next() {
		this._next = true;
		console.log(this.appointment + "T" + this.myForm.value.hour + ':00Z')
	}

	onSignup() {
		//armar fecha para crear cita
		let obj2 = {
			cita: {
				fecha: this.appointment + 'T' + this.myForm.value.hour + ':00Z',
				status: 'pendiente'
			}
		};
		console.log(obj2.cita.fecha);
		//crear cita
		let id: any;
		//obtener _id que no recuerdo en cual es do en map o en subscribe
		this.userProvider.createAppointment(obj2)
			.do(res => console.log(res.json()))
			.map(res => res.json())
			.subscribe(data => {
				id = data.appointment._id;
				var userId = this.oneSignal.getIds();
				var devicekey;
				userId.then(function (ids) {
					devicekey = ids.userId
					console.log(devicekey);
					createPatient(id, devicekey);
				});

			});
		var _this_ = this;
		var createPatient = function (id, devicekey) {

			let obj = {
				paciente: {
					nombre: _this_.myForm.value.name + " " + _this_.myForm.value.lastname + " " + _this_.myForm.value.lastname2,
					email: _this_.myForm.value.email,
					fecha_nacimiento: _this_.myDate,
					sexo: _this_.myForm.value.gender,
					telefono: _this_.myForm.value.phone,
					patologia: _this_.myForm.value.q1,
					alergia: _this_.myForm.value.q2,
					tomando_medicacion: _this_.myForm.value.q3,
					tratamiento: _this_.myForm.value.q4,
					meta: _this_.myForm.value.q5,
					activo: false,
					idCita: id, //se guarda la cita generada
					device_key: devicekey,
					userconfig: {
						timeBefore: 15,
						aceptNotification: true
					}
				}
			}

			_this_.userProvider.signup(obj)
				.do(res => console.log(res.json()))
				.map(res => res.json())
				.subscribe(data => {
					console.log(data);
					const history: any = {
						historial_citas: {
						  paciente: data.paciente._id
						}
					};
					_this_.userProvider.createHistory(history)
						.do(res => console.log(res.json()))
						.map(res => res.json())
						.subscribe(history => {
							console.log('resHistory', history);
							_this_.showToast();
						});
					
				});
		}

	}

	showToast() {
		let toast = this.toastCtrl.create({
			message: 'Te has registrado exitosamente. Te esperamos en nuestro consultorio en la fecha agendada',
			duration: 3000,
			position: 'middle'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
			this.navCtrl.pop();
		});

		toast.present();
	}

}
