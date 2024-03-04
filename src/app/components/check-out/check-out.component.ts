import { CartService } from 'src/app/shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cartId:string="";
  constructor(private _FormBuilder:FormBuilder , private _ActivatedRoute:ActivatedRoute ,
    private _CartService:CartService 
    ){}  
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>
        {
          this.cartId=params?.get("id")??"";
        },
        error:(err)=>{console.log(err);
        }
      })
  }
  checkOutForm:FormGroup=this._FormBuilder.group({
    details:[""],
    phone:[""],
    city:[""]
  })

  handlePayment():void{
    this._CartService.checkoutPayment(this.cartId,this.checkOutForm.value).subscribe({
      next:(response)=>
      {
        if(response.status == "success"){
          window.open(response.session.url,"_Self")
        }
        
      },
      error:(err)=>{console.log(err);
      }
    })
    
  }
}
