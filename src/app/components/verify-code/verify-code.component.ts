import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {
  /**
   *
   */
  errorCode:string="";
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService, private _ToastrService:ToastrService , private _Router:Router) {  }
    verifyCode:FormGroup =this._FormBuilder.group({
      resetCode:[null , [Validators.required]]
    })

    handleForm(){
      if(this.verifyCode.valid){
        this._AuthService.verifyCode(this.verifyCode.value).subscribe({
          next:(response)=>{console.log(response);
            this._ToastrService.success(response.message,"Freah Cart")
            this._Router.navigate(['/resetPassword'])
          },
          error:(err)=>{console.log(err);
            this.errorCode=err.error.message;
          }
        })
      }else{
        this.verifyCode.markAllAsTouched();
      }
    }
}
