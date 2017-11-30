import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from "chart.js";
import { UserProvider } from "../../providers/user.provider";
/**
 * Generated class for the ChartTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-chart-test',
	templateUrl: 'chart-test.html',
})
export class ChartTestPage {
	peso:Array<any>=[];
	talla:Array<any>=[];
	muslo:Array<any>=[];
	cin:Array<any>=[];
	cintura:Array<any>=[];
	cadera:Array<any>=[];

	@ViewChild('pesoCanvas') pesoCanvas;
	@ViewChild('tallaCanvas') tallaCanvas;
	@ViewChild('caderaCanvas') caderaCanvas;
	@ViewChild('cinturaCanvas') cinturaCanvas;
	@ViewChild('musloCanvas') musloCanvas;
	tallaChart: any;
	pesoChart:any;
	caderaChart:any;
	cinturaChart:any;
	musloChart:any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
	}

	ionViewDidLoad() {
		this.userProvider.getUser().then(datos => {
			console.log("userinstorage");
			this.userProvider.api.setTokenHeader(datos.token);
			this.userProvider.getFirstLastAppointmentRegisterData(datos.user._id)
				.do(res => console.log())
				.map(res => res.json())
				.subscribe(data => {
					this.peso.push(data.registrodecita[0].peso);
					this.peso.push(data.registrodecita[1].peso);
					this.talla.push(data.registrodecita[0].talla);
					this.talla.push(data.registrodecita[1].talla);
					this.cadera.push(data.registrodecita[0].mediciones.cirfunferencias.cadera);
					this.cadera.push(data.registrodecita[1].mediciones.cirfunferencias.cadera);
					this.cintura.push(data.registrodecita[0].mediciones.cirfunferencias.cintura);
					this.cintura.push(data.registrodecita[1].mediciones.cirfunferencias.cintura);
					this.muslo.push(data.registrodecita[0].mediciones.cirfunferencias.muslo);
					this.muslo.push(data.registrodecita[1].mediciones.cirfunferencias.muslo);
					this.pesoChart = new Chart(this.pesoCanvas.nativeElement, {
						type: 'bar',
						data: {
							labels: ['Antes', 'Despues'],
							datasets: [{
								label: "",
								data: this.peso,
								backgroundColor: [
									'rgba(255, 99, 132, 0.2)',//red
									'rgba(54, 162, 235, 0.2)'//blue
								],
								borderColor: [
									'rgba(255,99,132,1)',
									'rgba(54, 162, 235, 1)'
								],
								borderWidth: 1
							}]
						},
						options: {
							legend: {
								display: false
							},
							scales: {
								yAxes: [{
									ticks: {
										//stepSize:5,
										beginAtZero:true
									}
								}]
							}
						}
					});
					this.musloChart = new Chart(this.musloCanvas.nativeElement, {
						type: 'bar',
						data: {
							labels: ['Antes', 'Despues'],
							datasets: [{
								label: "",
								data: this.muslo,
								backgroundColor: [
									'rgba(255, 99, 132, 0.2)',//red
									'rgba(54, 162, 235, 0.2)'//blue
								],
								borderColor: [
									'rgba(255,99,132,1)',
									'rgba(54, 162, 235, 1)'
								],
								borderWidth: 1
							}]
						},
						options: {
							legend: {
								display: false
							},
							scales: {
								yAxes: [{
									ticks: {
										//stepSize:5,
										beginAtZero:true
									}
								}]
							}
						}
					});
					this.tallaChart = new Chart(this.tallaCanvas.nativeElement, {
						type: 'bar',
						data: {
							labels: ['Antes', 'Despues'],
							datasets: [{
								label: "",
								data: this.talla,
								backgroundColor: [
									'rgba(255, 99, 132, 0.2)',//red
									'rgba(54, 162, 235, 0.2)'//blue
								],
								borderColor: [
									'rgba(255,99,132,1)',
									'rgba(54, 162, 235, 1)'
								],
								borderWidth: 1
							}]
						},
						options: {
							legend: {
								display: false
							},
							scales: {
								yAxes: [{
									ticks: {
										//stepSize:5,
										beginAtZero:true
									}
								}]
							}
						}
			
					});
					this.caderaChart = new Chart(this.caderaCanvas.nativeElement, {
						type: 'line',
						data: {
							labels: ["Antes", "Despues"],
							datasets: [
								{
									label: "",
									fill: false,
									lineTension: 0.1,
									backgroundColor: "rgba(75,192,192,0.4)",
									borderColor: "rgba(75,192,192,1)",
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: "rgba(75,192,192,1)",
									pointBackgroundColor: "#fff",
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: "rgba(75,192,192,1)",
									pointHoverBorderColor: "rgba(220,220,220,1)",
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: this.cadera,
									spanGaps: false,
								}
							]
						},
						options: {
							legend: {
								display: false
							}
						},

					});
					this.cinturaChart = new Chart(this.cinturaCanvas.nativeElement, {
						
						type: 'line',
						data: {
							labels: ["Antes", "Despues"],
							datasets: [
								{
									label: "",
									fill: false,
									lineTension: 0.1,
									backgroundColor: "rgba(75,192,192,0.4)",
									borderColor: "rgba(75,192,192,1)",
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: "rgba(75,192,192,1)",
									pointBackgroundColor: "#fff",
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: "rgba(75,192,192,1)",
									pointHoverBorderColor: "rgba(220,220,220,1)",
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: this.cintura,
									spanGaps: false,
								}
							]
						},
						options: {
							legend: {
								display: false
							}
						},
	
					});
				});
				
		});

		console.log('ionViewDidLoad ChartTestPage');
	}

}
