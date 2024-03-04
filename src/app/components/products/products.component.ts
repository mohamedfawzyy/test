import { Product } from './../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { GetDataService } from 'src/app/shared/services/get-data.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  wishedProducts:Product[]=[];
  Allproducts:Product[]=[];

  constructor(private _GetDataService:GetDataService, private _CartService:CartService , private _ToastrService:ToastrService, private _WishListService:WishListService) {}
  ngOnInit(): void {
    this._GetDataService.getAllProducts().subscribe({
      next:(response)=>{

       this.Allproducts=response.data;
        this.checkWisheditems();
      },
      error:(err)=>{
        console.log(err);
      }
    })
   
  }
  AddToCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message,"FreshCart")
      },
      error:(err)=>{console.log(err);
      }
    })
  }
  addWishedProduct(product:Product , productID:string){
    if( !product.isWished){
      product.isWished=true;
      this._WishListService.addWishedProduct(productID).subscribe({
        next:(response)=>{
          this._ToastrService.success(response.message, "FreshCart");
        },
        error:(err)=>{console.log(err);
        }
      })
    }else{
      product.isWished=false;
      this._WishListService.removeWishedItem(productID).subscribe({
        next:(response)=>{
          if(response.status == "success"){
            this._ToastrService.warning(response.message, "removed Wised Item!")
          }
        },
        error:()=>{}
      })
    }
  
    
}

checkWisheditems(){
  this._WishListService.getALLWishedProducts().subscribe({
    next:(response)=>
    {
      this.wishedProducts=response.data;
    
      
    },
    error:(err)=>{console.log(err);
    }
  })
}

}
