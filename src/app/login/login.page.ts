import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginFormMessage = {
    email: [
      { type: 'required', message: 'El email es querido' },],
    password: [
      { type: 'required', message: 'El password es querido' },
      { type: 'minlength', message: 'El password debe tener mas de 6 caracteres' }],
    status: [
      { type: 'required', message: 'Debe selccionar una opcion' }
    ]
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
    this.buildForm();
  }
  goToPage() {
    this.navCtrl.navigateRoot('/register');
  }
  async loginUser() {
    try {
      if (this.loginForm.valid) {
        const { email,password } = this.loginForm.value;
        await this.authService.login(email,password);
        this.navCtrl.navigateRoot('/menu');
      }
    } catch (error) {
      console.log(error);
    }
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      status: ['']
    });
  }
}
