import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../../shared/input/input.component';
import { ErrorComponent } from "../../../../shared/error/error.component";
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../../models/IResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent, ErrorComponent],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
  isLoading:boolean = false;
  formForget!:FormGroup
  formVerify!:FormGroup
  formReset!:FormGroup
  step = 1
  private readonly _authService = inject(AuthService)
  private readonly fb = inject(FormBuilder)
  private readonly _route = inject(Router)
  private readonly _toastr = inject(ToastrService)

  constructor(){
    this.formForget = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    })
    this.formVerify = this.fb.group({
      resetCode: [null, [Validators.required, Validators.minLength(5),Validators.maxLength(6)]],
    })
    this.formReset = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    })
  }

  forgetForm(){
    if(this.formForget.valid){
      let email = this.formForget.get('email')?.value
      this.formReset.get('email')?.patchValue(email)
      this.isLoading = true;
      this._authService.forgetPassword(this.formForget.value).subscribe({
        next: (res:IResponse) => {
          console.log(res)
          this._toastr.success('send Code Successful! please check your email', 'Success');
          this.isLoading = false
        },
        error: (err) =>{
          console.log(err)
          this._toastr.error(err.error.message, 'Error');
          this.isLoading = false
        },
        complete: () => {
          this.step = 2
        }
      })
    }
    else {
      this.formForget.markAllAsTouched()
    }
  }
  verifyForm(){
    if(this.formVerify.valid){
      this.isLoading = true;
      this._authService.verifyResetCode(this.formVerify.value).subscribe({
        next: (res:IResponse) => {
          console.log(res)
          this._toastr.success('Reset code is correct!', 'Success');
          this.isLoading = false
        },
        error: (err) =>{
          console.log(err)
          this._toastr.error(err.error.message, 'Error');
          this.isLoading = false
        },
        complete: () => {
          this.step = 3
        }
      })
    }
    else {
      this.formVerify.markAllAsTouched()
    }
  }
  resetForm(){
    if(this.formReset.valid){
      this.isLoading = true;
      this._authService.resetCode(this.formReset.value).subscribe({
        next: (res:IResponse) => {
          console.log(res)
          this._authService.saveInfo(res.token)
          this._toastr.success('password is changed successful!', 'Success');
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
      this.formReset.markAllAsTouched()
    }
  }
}

