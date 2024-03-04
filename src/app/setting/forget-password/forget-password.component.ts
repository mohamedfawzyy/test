import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

    forgetPassword:FormGroup=new FormGroup({
      email:new FormControl(null , [Validators.required, Validators.email])
    })
    registerForm:FormGroup=new FormGroup(
      {
        name:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
        email:new FormControl(null, [Validators.required,Validators.email]),
        password:new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)] ),
        rePassword:new FormControl(null),
        phone:new FormControl(null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
      });
    handleForm(){}
}
