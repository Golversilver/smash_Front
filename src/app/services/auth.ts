import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

interface LoginDto{
  email: string;
  password: string;
}

interface RegisterDto{
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

   private http = inject(HttpClient);

   private api = environment.apiUrl;

   login(loginDto: LoginDto): Observable<any>{
    return this.http.post(`${this.api}/auth/login`, loginDto)
   }

   register(registerDto: RegisterDto): Observable<any>{
    return this.http.post(`${this.api}/auth/register`, registerDto)
   }

}
