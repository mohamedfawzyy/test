import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /**
   *
   */
  errorMSG:string="";
  isLoading:boolean=false;
  constructor(private _AuthService:AuthService,private _Router:Router, private _FormBuilder:FormBuilder) {}
  // loginForm:FormGroup=new FormGroup({
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
  // });
  loginForm:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })

  handleForm(){
    if(this.loginForm.valid){
      this.isLoading=true;
      this._AuthService.loginUser(this.loginForm.value).subscribe({
        next:(response)=>
        {
          this.isLoading=false;
          if(response.message == "success"){
          localStorage.setItem("eToken",response.token);
          this._AuthService.decodeToken();
            
              this._Router.navigate(['/home']);
            }
        },
        error:(error)=>
        {
          this.isLoading=false;
          this.errorMSG=error.error.message;
        }
        
      })
    }
    else
    {
      this.loginForm.markAllAsTouched();
    }
  }
}
