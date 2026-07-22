import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

interface RosterNoteDto {
   title: string,
   description: string,
   importance: string,
   is_public: boolean
}


@Injectable({
  providedIn: 'root',
})

export class NotesService {


  private http = inject(HttpClient);
  private api = environment.apiUrl;



   getPublicRosterNotes(rosterId: number, page: number, limit: number){

    let params = new HttpParams()
    .set('page', page)
    .set('limit', limit);

     return this.http.get<any>(`${this.api}/roster-notes/${rosterId}/public`, { params })
  }

  getPublicMatchNotes(rosterId: number, rivalId: number, page: number, limit: number){

    let params = new HttpParams()
    .set('page', page)
    .set('limit', limit);

     return this.http.get<any>(`${this.api}/match-notes/${rivalId}/roster/${rosterId}/public`, { params })
  }



  getRosterNotes(rosterId: number){
     return this.http.get<any>(`${this.api}/roster-notes/${rosterId}/notes`)
  }

  getMatchNotes(rosterId: number, rivalId: number){
     return this.http.get<any>(`${this.api}/match-notes/${rivalId}/roster/${rosterId}`)
  }

  registerMatchNotes(dto: RosterNoteDto, rosterId: number, rivalId: number){
     return this.http.post<any>(`${this.api}/match-notes/${rivalId}/roster/${rosterId}`, dto)
  }

  registerRosterNotes(dto: RosterNoteDto, rosterId: number){
     return this.http.post<any>(`${this.api}/roster-notes/${rosterId}/notes`, dto)
  }

  deleteRosterNote(noteId: number){
     return this.http.delete<any>(`${this.api}/roster-notes/${noteId}`)
  }

  deleteMatchNote(noteId: number){
     return this.http.delete<any>(`${this.api}/match-notes/${noteId}`)
  }

  editRosterNote(noteId: number, dto: RosterNoteDto){
     return this.http.patch<any>(`${this.api}/roster-notes/${noteId}`, dto)
  }

  editMatchNote(noteId: number, dto: RosterNoteDto){
     return this.http.patch<any>(`${this.api}/match-notes/${noteId}`, dto)
  }

  getMatchNote(noteId: number){
     return this.http.get<any>(`${this.api}/match-notes/${noteId}`)
  }

  getRosterNote(noteId: number){
     return this.http.get<any>(`${this.api}/roster-notes/${noteId}`)
  }


  copyMatchNotes(dto: RosterNoteDto, rosterId: number, rivalId: number){
     return this.http.post<any>(`${this.api}/match-notes/${rivalId}/roster/${rosterId}`, dto)
  }

  copyRosterNotes(dto: RosterNoteDto, rosterId: number){
     return this.http.post<any>(`${this.api}/roster-notes/${rosterId}/notes`, dto)
  }
}
