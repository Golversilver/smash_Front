import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';


interface EditProfileDto {
  name?: string;
  email?: string;
  password?: string;
}


@Injectable({
  providedIn: 'root',
})
export class ProfileService {

   private http = inject(HttpClient);
   private api = environment.apiUrl;

   editProfile(dto: EditProfileDto): Observable <any>{
      return this.http.patch<any>(`${this.api}/users`, dto);
   }

}
