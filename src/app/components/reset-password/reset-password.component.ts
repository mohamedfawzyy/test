import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  /**
   *
   */
  constructor(private _AuthService:AuthService , private _Router:Router , private _ToastrService:ToastrService) {}
  errorServerMSG:string="";
  resetForm:FormGroup =new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
    newPassword:new FormControl(null ,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
  })
  handleForm(){
    if(this.resetForm.valid){
      this._AuthService.resetPassword(this.resetForm.value).subscribe({
        next:(response)=>{
          this.errorServerMSG="";
          console.log(response);
          this._ToastrService.success("password changed succefully","FreshCart");
          localStorage.setItem("eToken",response.token);
          this._Router.navigate(['/home'])
        },
        error:(err)=>{console.log(err);
          this.errorServerMSG=err.error.message;
          
        }
      })
    }else{
      this.resetForm.markAllAsTouched();
    }
   
}
}
