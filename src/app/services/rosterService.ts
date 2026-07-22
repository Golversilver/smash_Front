import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

interface EditProfileDto {
  main: boolean;
  characterId: number;
}

@Injectable({
  providedIn: 'root',
})

export class RosterService {


  private http = inject(HttpClient);
  private api = environment.apiUrl;

  registreRoster(dto: EditProfileDto){
     return this.http.post<any>(`${this.api}/user-roster`, dto)
  }

  avalaibleCharacters(){
     return this.http.get<any>(`${this.api}/characters/findAvailable`)
  }

  searchRoster(){
     return this.http.get<any>(`${this.api}/user-roster`)
  }

  searchRosterId(rosterId: number){
     return this.http.get<any>(`${this.api}/user-roster/${rosterId}`)
  }
}
