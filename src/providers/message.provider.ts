import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class MessageProvider {

    constructor(
        public toastCtrl: ToastController
    ) {

    }

    toast(message: string) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 3500,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'OK'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    toastError(message: string, err: any) {
        let _message: string;
        if (err.status == 0)
            _message = "No se ha podido establecer conexión con el servidor"
        else _message = err.message;

        const toast = this.toastCtrl.create({
            message: message + ". " + _message,
            duration: 3500,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'OK'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

}