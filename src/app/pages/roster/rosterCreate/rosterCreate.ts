import { Component, signal } from '@angular/core';
import { Navbar } from "../../../components/navbar/navbar";
import { RosterService } from '../../../services/rosterService';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  imports: [Navbar, ReactiveFormsModule],
  templateUrl: './rosterCreate.html',
})
export default class  RosterCreate {

     constructor(private rosterService: RosterService, private router: Router){}

     characters = signal<any[]>([]);

    ngOnInit(): void {
      console.log('El componente se creó');
      this.loadCharacters();
    }


   rosterRegister(){

    if(this.rosterForm.invalid){
      this.rosterForm.markAllAsTouched();
      return;
    }

    const body = this.rosterForm.getRawValue();

    this.rosterService.registreRoster(body).subscribe({

     next: () => {

      Swal.fire({
        icon: 'success',
        title: '¡Personaje agregado!',
        text: 'El personaje se agregó correctamente al elenco.',
        confirmButtonText: 'Aceptar'
      }).then((result) => {

        if (result.isConfirmed) {
          this.router.navigate(['/elenco']);
        }

      });

    },

     error: (err) => {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message ?? 'No se pudo agregar el personaje.'
        });

      }

    })

   }
    
    

   loadCharacters(){

       this.rosterService.avalaibleCharacters().subscribe({

      next: (resp) => {
    
       this.characters.set(resp);

      },

      error: (err) => {
        console.log('❌ ERROR');
        console.log(err);
      }

    });
   }


    rosterForm = new FormGroup({

    characterId: new FormControl(0, {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  }),

   main: new FormControl(false, {
      nonNullable: true
    })

  })


}
