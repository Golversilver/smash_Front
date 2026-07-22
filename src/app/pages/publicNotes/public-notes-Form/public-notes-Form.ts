import { Component, signal } from '@angular/core';
import { Navbar } from "../../../components/navbar/navbar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NotesService } from '../../../services/NotesService';


@Component({
  selector: 'app-roster-notes-new',
  imports: [Navbar, RouterLink, ReactiveFormsModule],
  templateUrl: './public-notes-Form.html',
})
export default class RosterNotesNew {

  constructor(private router: Router, private notesService: NotesService, private route: ActivatedRoute){}

  notes = signal<any[]>([]);
  note = signal<any | null>(null);
  rivalId = signal<number | null>(null);
  rosterId!: number;
  editando = signal(false);
  noteId!: number;

  ngOnInit (): void{
  this.rosterId = Number(this.route.snapshot.paramMap.get('id'));

  const rival = this.route.snapshot.queryParamMap.get('rival');

  if (rival) {
    this.rivalId.set(Number(rival));
  }

  this.noteId = Number(this.route.snapshot.paramMap.get('noteId'));

  if (this.noteId) {
    this.editando.set(true);
    this.obtenerNota(this.noteId);
  }

  console.log('noteId', this.noteId);
  console.log('rivalId', this.rivalId());

  }

  copyNote(id: number){
    
     if(this.rosterNoteForm.invalid){
      this.rosterNoteForm.markAllAsTouched();
      return;
    }

    const body = this.rosterNoteForm.getRawValue();


     if (!this.rivalId()) {

          this.notesService.copyRosterNotes(body, this.rosterId).subscribe({

              next: () => {
            
                  Swal.fire({
                    icon: 'success',
                    title: 'nota copiada!',
                    text: 'La nota de personaje se agregó correctamente.',
                    confirmButtonText: 'Aceptar'
                  }).then((result) => {
            
                    if (result.isConfirmed) {
                      this.router.navigate(['/notas/', this.rosterId]);
                    }
            
                  });
            
                },
            
                  error: (err) => {
            
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: err.error?.message ?? 'No se pudo agregar la nota.'
                    });
            
                  }

          })

        }else{

          this.notesService.copyMatchNotes(body, this.rosterId, this.rivalId()!).subscribe({

              next: () => {
            
                  Swal.fire({
                    icon: 'success',
                    title: '¡Nota copiada!',
                    text: 'LA nota del enfrentamiento se agregó correctamente.',
                    confirmButtonText: 'Aceptar'
                  }).then((result) => {
            
                    if (result.isConfirmed) {
                       this.router.navigate(
                        ['/notas', this.rosterId],
                        {
                          queryParams: {
                            rival: this.rivalId()
                          }
                        }
                      );
                    }
            
                  });
            
                },
            
                  error: (err) => {
            
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: err.error?.message ?? 'No se pudo agregar la nota.'
                    });
            
                  }

          })

        }

      }


    obtenerNota(noteId: number) {

      if (this.rivalId()) {

        this.notesService.getMatchNote(noteId).subscribe({
            next: (resp) => {
                this.note.set(resp)

                this.rosterNoteForm.patchValue({
                title: resp.title,
                description: resp.description,
                importance: resp.importance,
                is_public: resp.is_public
        });

            },
            error: (err) =>{
                 console.log(err)
            }
       })

      } else {
        this.notesService.getRosterNote(noteId).subscribe({
          
          next: (resp) => {
             this.note.set(resp)

            this.rosterNoteForm.patchValue({
            title: resp.title,
            description: resp.description,
            importance: resp.importance,
            is_public: resp.is_public
        });

          },
          error: (err) => {
             console.log(err);
          }

      });
      }

    }

    rosterNoteForm = new FormGroup({

    title: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
    }),

    description: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  }),

    importance: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  }),

  is_public: new FormControl(false, {
    nonNullable: true
  })

  })


}
