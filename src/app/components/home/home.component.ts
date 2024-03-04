import { Product } from './../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { GetDataService } from 'src/app/shared/services/get-data.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  wishedProducts:Product[]=[];
  Allproducts:Product[]=[];
  categoriesArr:any[]=[];

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
    this._GetDataService.getCategories().subscribe({
      next:(response)=>{
        this.categoriesArr=response.data
        
      },
      error:(error)=>
      {
        console.log(error);
        
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


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 5
      },
      740: {
        items: 6
      }
    },
    nav: true
  }
 

}
