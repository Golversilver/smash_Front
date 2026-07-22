  import { HttpClient } from '@angular/common/http';
  import { inject, Injectable } from '@angular/core';
  import { environment } from '../../enviroments/enviroment';

  @Injectable({
    providedIn: 'root',
  })

  export class CharacterService {


    private http = inject(HttpClient);
    private api = environment.apiUrl;

    getCharacters(){
      return this.http.get<any>(`${this.api}/characters`);
    }

    searchCharacter(characterId: number){
      return this.http.get<any>(`${this.api}/characters/${characterId}`);
    }
  }
