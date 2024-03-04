import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { GetDataService } from 'src/app/shared/services/get-data.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
 wishedProducts:Product[]=[];
  constructor(private _WishListService:WishListService  , private _ToastrService:ToastrService , private _CartService:CartService) {}
  
  ngOnInit(): void {
    
        this.getAllWishedList();
    
      
  }
  getAllWishedList():void{
    this._WishListService.getALLWishedProducts().subscribe({
      next:(response)=>
      {
        this.wishedProducts= response.data;
      },
      error:(err)=>
      {
        console.log(err);
      }
    })
  }
  removeWishedItem(productId:string){
      this._WishListService.removeWishedItem(productId).subscribe({
        next:(response)=>{
          if(response.status == "success"){
            this._ToastrService.warning(response.message,"remove wished item!")
            this.getAllWishedList();
          }
         
         
        },
        error:(err)=>{console.log(err);
        }
      })
  }
addProduct(productId:string){
  this._CartService.addToCart(productId).subscribe({
  next:(response)=>{
    if(response.status == "success"){
      this._ToastrService.success(response.message,"Product added");
      this.removeWishedItem(productId);
    }
  
  },
  error:()=>{}
  });
}
  
}
