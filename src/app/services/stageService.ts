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

export class StageService {


  private http = inject(HttpClient);
  private api = environment.apiUrl;

  getStages(){
     return this.http.get<any>(`${this.api}/stages`);
  }
}
