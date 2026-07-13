import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {

  constructor(private authService: AuthService, private router: Router){}

  loginError = signal('');

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  loginForm = new FormGroup({

    email: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.email
    ]
  }),

    password: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(8)
    ]
  })

  })

  login(){

     this.loginError.set('');

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const body = this.loginForm.getRawValue();

    this.authService.login(body).subscribe({

      next: (resp) => {
        console.log('✅ NEXT');
        console.log(resp);
        localStorage.setItem('token', resp.accessToken);
        this.router.navigate(['/panelPrincipal']);
      },

      error: (err) => {
        console.log('❌ ERROR');
        console.log(err);
      if (err.status === 401) {
        this.loginError.set('Correo o contraseña incorrectos.');
      } else {
        this.loginError.set('Ocurrió un error inesperado. Inténtalo de nuevo.');
      }
      }
    });

  }

}
