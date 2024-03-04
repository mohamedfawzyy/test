import { Component, OnInit } from '@angular/core';
import { cartDetails } from 'src/app/shared/interfaces/cart-details';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  emptyCart:string="";
  cartDetails:cartDetails={} as cartDetails;
  constructor(private _CartService:CartService) { }
  ngOnInit(): void {
      this._CartService.getUserCart().subscribe({
        next:(response)=>{
        
          
          this.cartDetails=response.data;
        },
        error:(err)=>{
          console.log(err);
          
          this.emptyCart=err.error.message.split(":")[0]
          console.log(this.emptyCart);
          
        }
      })
  }
  removeItem(productId:string){
    this._CartService.removeCartProduct(productId).subscribe({
      next:(response)=>
      {
        this.cartDetails=response.data
      },
      error:(err)=>{console.log(err);
      }
    })
  }

  updateCount(productId:string,count:number){
    if(count <= 0){
        this.removeItem(productId);
    }else{
      this._CartService.updateCartQuantity(productId,count).subscribe({
        next:(response)=>
        {
          this.cartDetails=response.data;
        },
        error:(err)=>{console.log(err);
        }
      })
    }
  
  }
}
