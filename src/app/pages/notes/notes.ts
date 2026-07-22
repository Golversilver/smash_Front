  import { Component, computed, signal } from '@angular/core';
  import { Navbar } from "../../components/navbar/navbar";
  import { NotesService } from '../../services/NotesService';
  import { ActivatedRoute, RouterLink } from '@angular/router';
  import { ReactiveFormsModule } from '@angular/forms';
  import { RosterService } from '../../services/rosterService';
  import { CharacterService } from '../../services/characterService';
  import { NgSelectComponent } from "@ng-select/ng-select";
  import { Router } from '@angular/router';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-roster-notes',
    imports: [Navbar, RouterLink, NgSelectComponent],
    templateUrl: './notes.html',
    styleUrl: './notes.css',
  })

  
  

  export default class RosterNotes {

    constructor(private notesService: NotesService, private route: ActivatedRoute,private rosterService: RosterService,
      private charactersService: CharacterService,  private router: Router){}

    notes = signal<any[]>([]);
    characters = signal<any[]>([]);
    roster = signal<any | null>(null);
    rosterId!: number;
    rival = signal<any | null>(null);

    highNotes = computed(() =>
      this.notes().filter(n => n.importance === 'HIGH')
    );

    mediumNotes = computed(() =>
      this.notes().filter(n => n.importance === 'MEDIUM')
    );

    lowNotes = computed(() =>
      this.notes().filter(n => n.importance === 'LOW')
    );

    ngOnInit(): void {

      this.rosterId = Number(this.route.snapshot.paramMap.get('id'));

      this.getRoster(this.rosterId);

      this.getCharacters();
    }

    getNotes(idRoster: number){

      this.notesService.getRosterNotes(idRoster).subscribe({

        next: (resp) => {
          console.log('notas traidas')
          this.notes.set(resp);
        },

        error: (err) => {
          console.log(err)
        }

      })
    }

    deleteNote(noteId: number) {

      Swal.fire({
        title: '¿Eliminar esta nota?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280'
      }).then((result) => {

        if (!result.isConfirmed) return;

        const request = this.rival()
          ? this.notesService.deleteMatchNote(noteId)
          : this.notesService.deleteRosterNote(noteId);

        request.subscribe({

          next: () => {

            Swal.fire({
              icon: 'success',
              title: 'Nota eliminada',
              timer: 1500,
              showConfirmButton: false
            });

            this.cargarVista();

          },

          error: (err) => {

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.error?.message ?? 'No se pudo eliminar la nota.'
            });

          }

        });

      });

    }

    editarNota(noteId: number) {

      if (this.rival()) {

        this.router.navigate(
          ['/notas', this.rosterId, 'editarNota', noteId],
          {
            queryParams: {
              rival: this.rival()!.id
            }
          }
        );

      } else {

        this.router.navigate(
          ['/notas', this.rosterId, 'editarNota', noteId]
        );

      }

    }


  getNotesMatch(rosterId: number, rivalId: number){

      this.notesService.getMatchNotes(rosterId, rivalId).subscribe({

        next: (resp) => {
          console.log('notas del match traidas')
          this.notes.set(resp);
        },

        error: (err) => {
          console.log(err)
        }

      })
    }


      getRoster(idRoster: number){

      this.rosterService.searchRosterId(idRoster).subscribe({

        next: (resp) => {
          console.log('Personaje traido')
          console.log(resp);
          this.roster.set(resp);
        },

        error: (err) => {
          console.log(err)
        }

      })
      }


      private cargarVista() {

        const rivalId = Number(this.route.snapshot.queryParamMap.get('rival'));

        if (!rivalId) {
          this.rival.set(null);
          this.getNotes(this.rosterId);
          return;
        }

        const rival = this.characters().find(c => c.id === rivalId);

        if (!rival) {
          this.rival.set(null);
          this.getNotes(this.rosterId);
          return;
        }

        this.rival.set(rival);
        this.getNotesMatch(this.rosterId, rival.id);
      }


    getCharacters() {

        this.charactersService.getCharacters().subscribe({
          next: (resp) => {
            this.characters.set(resp);

            this.route.queryParamMap.subscribe(() => {
              this.cargarVista();
            });

          }

        });

    }

    asignarRival(character: any){
      this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        rival: character.id
      },
      queryParamsHandling: 'merge'
  });
    }

    volverNotasSingles(){
        this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          rival: null
        },
        queryParamsHandling: 'merge'
  });
    }


      menuAbierto = signal<number | null>(null);

      toggleMenu(noteId: number) {

        if (this.menuAbierto() === noteId) {
          this.menuAbierto.set(null);
          return;
        }

        this.menuAbierto.set(noteId);
      }
  }
