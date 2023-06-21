import { Injectable, inject, signal } from '@angular/core';
import { IUser, Initial_State } from '../Types/types';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  state = signal(Initial_State);
  private http = inject(HttpClient);

  signIn(data: {email: string, password:string}){
      return this.http.post<{success : boolean, data: any}>(env.apiUrl+'auth/signin',data);
  }
  signUp(data: IUser){
      return this.http.post<{success: boolean, data: any}>(env.apiUrl+'auth/signup',data);
  }
}
