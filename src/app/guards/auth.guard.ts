import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
private authService: AuthService,
private navCtrl: NavController
  ){}
  async canActivate(){
    try {
      const user =await this.authService.stateUser();
      if(user){
        this.navCtrl.navigateRoot('/menu');
      }else{
        return true;
      }
    } catch (error) {
      return true;
    }
  }
}
