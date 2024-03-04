import { Product } from 'src/app/shared/interfaces/product';
import { GetDataService } from 'src/app/shared/services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute , private _GetDataService:GetDataService, private _CartService:CartService , private _ToastrService:ToastrService) {}
  Product:Product={} as Product;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this._GetDataService.getSpecificProduct(params.get('id')).subscribe({
          next:(response)=>{
           
            this.Product=response.data;
            
          },
          error:()=>{}
        });
      },
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    
    responsive: {
      0: {
        items: 1
      }
    },
    
  }
  addToCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message,"FreshCart")
      },
      error:(err)=>{console.log(err);
      }
    })
  }
}
