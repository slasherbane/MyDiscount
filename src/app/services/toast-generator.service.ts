import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastGeneratorService {
 
  static toast = new ToastController();
  constructor() { }

  static async generate(message,duration,pos,cssClass){
    const pres = await ToastGeneratorService.toast.create({
      message: message,
      duration: 2000,
      position: 'top',
      animated: true,
      cssClass: 'my-custom-class',
    });
    await pres.present();
  }
}
