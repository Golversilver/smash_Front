import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Navbar } from "../../components/navbar/navbar";
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  imports: [Navbar, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export default class Profile {

   constructor(private authService: AuthService, private router: Router, private profileService: ProfileService){}

   passwordError = signal('');

  ngOnInit(): void {
    console.log('El componente se creó');
    this.loadProfile();
  }


   loadProfile(){

       this.authService.profile().subscribe({

      next: (resp) => {
        this.profileForm.patchValue({
          name: resp.name,
          email: resp.email,
        })
      },

      error: (err) => {
        console.log('❌ ERROR');
        console.log(err);
      }

    });
   }


   updateprofile(){

    if(this.passwordForm.invalid){
      this.passwordForm.markAllAsTouched();
      return;
    }

    const body = this.passwordForm.getRawValue();

    this.profileService.editProfile(body).subscribe({

      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Perfil actualizado',
          text: 'Tus datos se guardaron correctamente.',
          confirmButtonColor: '#dc2626'
        });
      },

      error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo actualizar',
        text: err.error.message,
        confirmButtonColor: '#dc2626'
      });
    }

    })

   }


   updatePassword(){

    this.passwordError.set('')

    if(this.passwordForm.invalid){
      this.passwordForm.markAllAsTouched();
      return;
    }

    const body = this.passwordForm.getRawValue();

    if(body.password !== body.passwordRepeat){
      this.passwordError.set('Las contraseñas deben ser iguales')
    }else{

      this.profileService.editProfile({password: body.password}).subscribe({

      next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada',
                text: 'Tus datos se guardaron correctamente.',
                confirmButtonColor: '#dc2626'
              });
            },

      error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'No se pudo actualizar',
              text: err.error.message,
              confirmButtonColor: '#dc2626'
            });
          }

      })

    }
   }


  profileForm = new FormGroup({

    email: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.email
    ]
  }),

    name: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  })
  })


    passwordForm = new FormGroup({

    password: new FormControl('', {
    nonNullable: true,
    validators: [
       Validators.required,
      Validators.minLength(6)
    ]
  }),

    passwordRepeat: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(6)
    ]
  })
  })


}