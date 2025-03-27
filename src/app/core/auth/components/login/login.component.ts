import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IResponse } from '../../models/IResponse';
import { InputComponent } from '../../../../shared/input/input.component';
import { ErrorComponent } from "../../../../shared/error/error.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent, ErrorComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading:boolean = false;
  formLogin!:FormGroup
  private readonly _authService = inject(AuthService)
  private readonly fb = inject(FormBuilder)
  private readonly _route = inject(Router)
  private readonly _toastr = inject(ToastrService)

  constructor(){
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    })
  }

  loginForm(){
    if(this.formLogin.valid){
      this.isLoading = true;
      this._authService.login(this.formLogin.value).subscribe({
        next: (res:IResponse) => {
          console.log(res)
          this._authService.saveInfo(res.token)
          this._toastr.success('Login Successful!', 'Success');
          this.isLoading = false
        },
        error: (err) =>{
          console.log(err)
          this._toastr.error(err.error.message, 'Error');
          this.isLoading = false
        },
        complete: () => {
          this._route.navigate(['/home']);
        }
      })
    }
    else {
      this.formLogin.markAllAsTouched()
    }
  }
}
