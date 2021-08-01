import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import {Storage} from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private navCtrl: NavController){}
  async canActivate(){
    const isIntroShowed=await this.storage.get('isIntroShowed');
    if (isIntroShowed) {
      return  isIntroShowed;
    } else{
this.navCtrl.navigateRoot('/intro');
    }
  }
}
