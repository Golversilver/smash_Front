  import { HttpClient, HttpParams } from '@angular/common/http';
  import { inject, Injectable } from '@angular/core';
  import { environment } from '../../enviroments/enviroment';
  

  interface GameDto {
    online: boolean,
    win: boolean,
    stageId: number,
    userRosterId: number,
    characterRival: number
  }

  @Injectable({
    providedIn: 'root',
  })

  export class GameService {


    private http = inject(HttpClient);
    private api = environment.apiUrl;

    registerGame(dto: GameDto){
      return this.http.post<any>(`${this.api}/games`, dto);
    }

    getGames(page: number, limit: number, selectedRoster: number, online?: boolean){

    let params = new HttpParams()
    .set('page', page)
    .set('limit', limit);

    if(selectedRoster){
      params = params.set('userRosterId', selectedRoster);
    }
  
    if(online){
      params = params.set('online', online);
    }

      return this.http.get<any>(`${this.api}/games`, {params});
    }
    
  }
