import { Component, signal } from '@angular/core';
import { Navbar } from "../../../components/navbar/navbar";
import { GameService } from '../../../services/gameService';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { StageService } from '../../../services/stageService';
import { CharacterService } from '../../../services/characterService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RosterService } from '../../../services/rosterService';

@Component({
  selector: 'app-nuevo',
  imports: [Navbar, NgSelectComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './newGame.html',
  styleUrl: './newGame.css'
})
export default class GameForm {

   constructor(private gameService: GameService, private router: Router,private stageService: StageService, private charactersService: CharacterService,
               private rosterService: RosterService){}

   roster = signal<any[]>([])
   characters = signal<any[]>([])
   stages = signal<any[]>([])

    ngOnInit(): void{

      this.getRoster();
      this.getCharacters();
      this.getStages();

    }

    getRoster(){
        
      this.rosterService.searchRoster().subscribe({

         next: (resp) => {

            console.log("elenco cargado")
            this.roster.set(resp);

         },

         error: (err) => {
          console.log(err)
         }
      })
    }


     getCharacters(){
        
      this.charactersService.getCharacters().subscribe({

         next: (resp) => {
            console.log("personajes cargados");
            console.log(resp);
            this.characters.set(resp);
         },

         error: (err) => {
          console.log(err)
         }
      })
    }

      getStages(){
        
      this.stageService.getStages().subscribe({

         next: (resp) => {
            console.log("escenarios cargados");
            this.stages.set(resp);
         },

         error: (err) => {
          console.log(err)
         }
      })
    }

    register(){
      
   if(this.gameForm.invalid){
      this.gameForm.markAllAsTouched();
      return;
    }

    const body = this.gameForm.getRawValue();

    this.gameService.registerGame(body).subscribe({

       
            next: () => {
       
             Swal.fire({
               icon: 'success',
               title: '¡partida agregada!',
               text: 'La partida se agregó correctamente.',
               confirmButtonText: 'Aceptar'
             }).then((result) => {
       
               if (result.isConfirmed) {
                 this.router.navigate(['/panelPrincipal']);
               }
       
             });
       
           },
       
            error: (err) => {
       
               Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: err.error?.message ?? 'No se pudo agregar el juego.'
               });
       
             }

    })

    }

   gameForm = new FormGroup({

    userRosterId: new FormControl(0, {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  }),

    characterRival: new FormControl(0, {
      nonNullable: true,
      validators: [
         Validators.required,
      ]
   }),

   stageId: new FormControl(0 , {
      nonNullable: true,
      validators: [
         Validators.required
      ]
   }),

   win: new FormControl(false, {
      nonNullable: true
   }),

   online: new FormControl(false, {
      nonNullable: true
   }),

   })

}
