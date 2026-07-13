import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export default class Register {

  constructor(private authService: AuthService, private router: Router){}

  registerError = signal('');

    get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

    get name() {
    return this.registerForm.controls.password;
  }

  registerForm = new FormGroup({

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
      Validators.minLength(6)
    ]
    }),


    name: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
    })

  })//fin form group

  register(){

    this.registerError.set('');

    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    const body = this.registerForm.getRawValue();

    this.authService.register(body).subscribe({

      next: (resp) => {
        console.log('✅ NEXT');
        console.log(resp);
        localStorage.setItem('token', resp.accessToken);
        this.router.navigate(['/PanelPrincipal']);
      },

      error: (err) => {
         console.log('❌ ERROR');
        this.registerError.set(err.error.message);
      }
    })
  }
}
