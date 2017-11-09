import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserProvider } from "../../providers/user.provider";

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
	appointment:string;//2015-03-25T12:00:00Z
	/*hours=[{hour:"09:00"},{hour:"09:30"},{hour:"10:00"},{hour:"10:30"},{hour:"11:00"},{hour:"11:30"}
			,{hour:"12:00"},{hour:"12:30"},{hour:"13:00"},{hour:"13:30"},{hour:"14:00"},{hour:"14:30"}
			,{hour:"15:00"},{hour:"15:30"},{hour:"16:00"},{hour:"16:30"}];*/
	hours=["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30",
			"15:00","15:30","16:00","16:30"];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public formBuilder: FormBuilder,
		public modalController: ModalController,
		public userProvider: UserProvider
	) {
		this.myDate = new Date(1971, 0, 1).toISOString().slice(0, 10);
		this.appointment= new Date(1971,0,1).toISOString().slice(0,10);
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
			hour:['', Validators.compose([Validators.required])]
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}
	getHour(date):String{
		return date.slice(11,16);
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
		console.log("holaaaaaaaa "+this.appointment)
		let modal = this.modalController.create('DateChooserModalPage', { data: { date: this.appointment, to: new Date(2012, 0, 1), from: new Date(1970, 0, 1) } });
		modal.present();
		modal.onDidDismiss((data) => {
			console.log(data);
			if (!data) return;
			this.appointment = new Date(data).toISOString().slice(0, 10);
			this.userProvider.getAppointmentsForDate(this.appointment)	//para que se vuelve a reiniciar el date
				.do(res => console.log(res.json()))
				.map(res => res.json())
				.subscribe(data => {
					//obtener el json con los que ya estan 	
					//
				});
		});


	}
	next() {
		this._next = true;
	}

	onSignup() {
		//armar fecha para crear cita
		let obj2= {
			appointment:{
				fecha:this.appointment+'T'+this.myForm.value.hour+':00Z'			}
		};
		//crear cita
		let id:any;
		//obtener _id que no recuerdo en cual es do en map o en subscribe
		this.userProvider.createAppointment(obj2)
		.do(res => console.log(res.json()))
		.map(res => res.json())
		.subscribe(data => {
		
		});
		let obj = {
			paciente: {
				nombre: this.myForm.value + " " + this.myForm.value.lastname + " " + this.myForm.value.lastname2,
				email: this.myForm.value.email,
				fecha_nacimiento: this.myDate,
				sexo: this.myForm.value.gender,
				telefono: this.myForm.value.phone,
				patologia: this.myForm.value.q1,
				alergia: this.myForm.value.q2,
				tomando_medicacion: this.myForm.value.q3,
				tratamiento: this.myForm.value.q4,
				meta: this.myForm.value.q5,
				activo: false,
				idCita:id //se guarda la cita generada
			}
		}
		
		this.userProvider.signup(obj)
			.do(res => console.log(res.json()))
			.map(res => res.json())
			.subscribe(data => {

			});

	}

}
