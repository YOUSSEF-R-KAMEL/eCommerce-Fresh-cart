import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IResponse } from '../../models/IResponse';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  msgError:string = '';
  isLoading:boolean = false
  private readonly _AuthService = inject(AuthService)
  private readonly _formBuild = inject(FormBuilder)
  private readonly _route = inject(Router)

  formReg:FormGroup = this._formBuild.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null],
  }, {validators: this.confirmPassword})

  confirmPassword(g:AbstractControl){
    return (g.get('password')?.value == g.get('rePassword')?.value) ? null : {mismatch: true}
  }

  onRegister(){
    if(this.formReg.valid){
      this.isLoading = true
      this._AuthService.setRegisterForm(this.formReg.value).subscribe({
        next: (res:IResponse) => {
          console.log(res)
          if(res.message == 'success'){
            this._route.navigateByUrl('/login');
          }
          this.isLoading = false
        },
        error: (err) =>{
          this.msgError = err.error.message
          console.log(err)
          this.isLoading = false
        }
      })
    }
    else {
      this.formReg.setErrors({mismatch: true})
      this.formReg.markAllAsTouched()
    }
  }
}
