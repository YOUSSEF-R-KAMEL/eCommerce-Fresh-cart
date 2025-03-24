import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { IResponse } from '../models/IResponse';
import { IRegister } from '../models/IRegister';
import { ILogin } from '../models/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient = inject(HttpClient)
  userData:any
  setRegisterForm(data:IRegister):Observable<IResponse>{
    return this._httpClient.post<IResponse>(`${environment.baseUrl}api/v1/auth/signup`, data)
  }

  setLoginForm(data:ILogin):Observable<IResponse>{
    return this._httpClient.post<IResponse>(`${environment.baseUrl}api/v1/auth/signin`, data)
  }

  saveUserData(){
    if(localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken') !)
    }
    console.log(this.userData)
  }
}
