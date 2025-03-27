import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { IResponse, IUser } from '../models/IResponse';
import { IRegister } from '../models/IRegister';
import { ILogin } from '../models/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient)

  register(data:IRegister):Observable<IResponse>{
    return this._httpClient.post<IResponse>('auth/signup', data)
  }
  login(data:ILogin):Observable<IResponse>{
    return this._httpClient.post<IResponse>('auth/signin', data)
  }
  forgetPassword(email:string):Observable<IResponse>{
    return this._httpClient.post<IResponse>('auth/forgotPasswords', email)
  }
  verifyResetCode(resetCode:string):Observable<IResponse>{
    return this._httpClient.post<IResponse>('auth/verifyResetCode', resetCode)
  }
  resetCode(data:ILogin):Observable<IResponse>{
    return this._httpClient.put<IResponse>('auth/resetPassword', data)
  }

  saveInfo(token:string){
    localStorage.setItem('token', token)
  }

  deleteInfo(){
    localStorage.removeItem('token')
  }
}
