import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IResponse } from '../../models/IResponse';
import { InputComponent } from '../../../../shared/input/input.component';
import { ErrorComponent } from '../../../../shared/error/error.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent, ErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading:boolean = false;
  formReg!:FormGroup

  private readonly _AuthService = inject(AuthService)
  private readonly _formBuild = inject(FormBuilder)
  private readonly _route = inject(Router)
  private readonly _toastr = inject(ToastrService)
  private readonly fb = inject(FormBuilder)

  constructor(){
    this.formReg = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
    }, {validators: this.confirmPassword})
  }

  confirmPassword(g:AbstractControl){
    return (g.get('password')?.value == g.get('rePassword')?.value) ? null : {mismatch: true}
  }

  onRegister(){
    if(this.formReg.valid){
      this.isLoading = true
      this._AuthService.register(this.formReg.value).subscribe({
        next: (res:IResponse) => {
          console.log(res)
          this._toastr.success('Register Successful!', 'Success');
          this.isLoading = false
        },
        error: (err) =>{
          console.log(err)
          this._toastr.error(err.error.message, 'Error');
          this.isLoading = false
        },
        complete: () => {
          this._route.navigate(['/login']);
        }
      })
    }
    else {
      this.formReg.setErrors({mismatch: true})
      this.formReg.markAllAsTouched()
    }
  }
}
