import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
registerForm: FormGroup;
registerFormMessages={
  nickname: [
    {type: 'required', message:'El nickname es obligatorio'},
    {type: 'minlength', message:'El nickname debe tener minimo 5 carateres'}
  ],
  email: [
    {type: 'required', message:'El email es obligatorio'},
    {type: 'email', message:'Este campo debe contener un email'}
  ],
};
  constructor(private formBuilder: FormBuilder, private authService: AuthService,private navCtrl: NavController) { }

  ngOnInit() {
    this.buildform();
  }
  async registerUser(){
    if (this.registerForm.valid) {
      try{
      const {nickname,email,password}=this.registerForm.value;
      await this.authService.register(nickname,email,password);
      this.navCtrl.navigateRoot('/menu');
    }catch (error){
      console.log(error);
    }
    }
  }
private buildform(){
this.registerForm=this.formBuilder.group({
  nickname:['',[Validators.required,Validators.minLength(5)]],
  email: ['',[Validators.required,Validators.email]],
  password: ['',[Validators.required,Validators.minLength(6)]],
});
}
}
