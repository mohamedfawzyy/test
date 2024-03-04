import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
 errorEmail:string="";
  constructor(private _AuthService:AuthService , private _ToastrService:ToastrService , private _Router:Router) {}
  forgetPassword:FormGroup=new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email])
  })
  handleForm(){
    if(this.forgetPassword.valid){
      this._AuthService.forgetPassword(this.forgetPassword.value).subscribe({
        next:(response)=>{console.log(response);
              this.errorEmail="";
              this._ToastrService.success(response.message,"Success");
              this._Router.navigate(['/verifyCode'])
            
        },
        error:(err)=>{
          this.errorEmail=err.error.message
        }
      })
    }
    
    
  }
}
