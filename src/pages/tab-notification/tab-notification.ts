import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user.provider";
import { NotificationMessageProvider } from "../../providers/notification_message.provider";
/**
 * Generated class for the TabNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-notification',
  templateUrl: 'tab-notification.html',
})
export class TabNotificationPage {

  segment: String;
  notifications: any[];
  generals: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public userProvider:UserProvider,public notificationMsj:NotificationMessageProvider) {
    this.segment = "notification";

    this.notifications = [
      {
        title: "Recordatorio de desayuno",
        subtitle: "Desayunar huevito con catsun, yogurt y pan",
        hour: "08:00"
      },
      {
        title: "Recordatorio de comida",
        subtitle: "Comer pollo a la plancha y arroz",
        hour: "12:00"
      },
      {
        title: "Recordatorio de merienda",
        subtitle: "",
        hour: "15:00"
      },
    ];

    this.generals = [
      {
        title: "Cita",
        subtitle: "Cita el próximo Jueves 19 de Octubre",
        hour: "09:00"
      },
      {
        title: "Cambio de acuerdos",
        subtitle: "Cambio de acuerdos en la aplicación",
        hour: "10:00"
      },
      {
        title: "Notificación de prueba",
        subtitle: "Probando las notificaciones",
        hour: "11:00"
      },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabNotificationPage');
    this.userProvider.getUser().then(datos => {
      console.log("userinstorage");
      console.log(datos.user._id);
      this.userProvider.api.setTokenHeader(datos.token);
      this.notificationMsj.getMessages(datos.user._id)
      .do(res => {}/*console.log(res.json())*/)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
    });
  }

}
