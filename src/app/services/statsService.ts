import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

interface StageDto {
  userRosterId?: number;
  online?: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class StatsService {


  private http = inject(HttpClient);
  private api = environment.apiUrl;

  getStagesStats(userRosterId?: number, online?: boolean){

    const body: StageDto = {
      userRosterId,
      online,
    };

    return this.http.post<any>(`${this.api}/stats/stages`, body);
  }

  getRosterStats(online?: boolean){

    let params = new HttpParams();

    if(online){
      params = params.set('online', online);
    }

    return this.http.get<any>(`${this.api}/stats/roster`, {params});
  }



    getMatchsStats(page: number, limit: number, rosterId: number, online?: boolean){

    let params = new HttpParams()
    .set('page', page)
    .set('limit', limit);
  
    if (online !== undefined) {
      params = params.set('online', online);
    }

      return this.http.get<any>(`${this.api}/stats/matchs/${rosterId}`, {params});
    }


}
