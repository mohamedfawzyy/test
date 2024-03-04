import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    userData:any;
    baseURL:string="https://ecommerce.routemisr.com";
  constructor(private _HttpClient:HttpClient,private _Router:Router) { }

  registerUser(userValue:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userValue);
  }

  loginUser(userValue:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',userValue)
  }

  decodeToken(){
    if(localStorage.getItem('eToken')){
      let decodedToken:any=localStorage.getItem('eToken');
      let data=jwtDecode(decodedToken);
      this.userData=data; 
      console.log(this.userData);
    }
  }

  logoutUser():void{
    if(localStorage.getItem("eToken")){
    localStorage.removeItem("eToken");
    
    }
    this._Router.navigate(['/login']);
  }

  forgetPassword(body:object):Observable<any>{
    return this._HttpClient.post(this.baseURL+"/api/v1/auth/forgotPasswords",
    body
    )
  }

  verifyCode(body:object):Observable<any>{
    return this._HttpClient.post(this.baseURL+"/api/v1/auth/verifyResetCode",body);
  }

  resetPassword(body:object):Observable<any>{
    return this._HttpClient.put(this.baseURL+'/api/v1/auth/resetPassword',body)
  }
}
