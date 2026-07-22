import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

interface WinRateDto {
  userRosterId?: number;
  online?: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class DashboardService {


  private http = inject(HttpClient);
  private api = environment.apiUrl;

  winRate(userRosterId: number, online?: boolean){

    const body: WinRateDto = {
      userRosterId,
      online,
    };

    return this.http.post<any>(`${this.api}/stats/winRate`, body);
  }

  getCards(userRosterId: number, online?: boolean){

    const body: WinRateDto = {
      userRosterId,
      online,
    };

    return this.http.post<any>(`${this.api}/stats/cards`, body);
  }

}
