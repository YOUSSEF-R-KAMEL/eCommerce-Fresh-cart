import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IResponse } from '../../models/IResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  msgError:string = '';
  isLoading:boolean = false;
  formLogin!:FormGroup
  private readonly _AuthService = inject(AuthService)
  private readonly fb = inject(FormBuilder)
  private readonly _route = inject(Router)
  constructor(){
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    })
  }

  loginForm(){
    if(this.formLogin.valid){
      this._AuthService.setLoginForm(this.formLogin.value).subscribe({
        next: (res:IResponse) => {

        },
        error: (err) =>{
          this.msgError = err.error.message
          console.log(err)
        },
        complete: () => {

        }
      })
    }
    else {
      this.formLogin.markAllAsTouched()
    }
  }
}
