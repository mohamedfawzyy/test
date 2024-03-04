import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  baseURL:string='https://ecommerce.routemisr.com';
  constructor(private _HttpClient:HttpClient) { }
  addWishedProduct(productID:string):Observable<any>{
    return this._HttpClient.post(this.baseURL+'/api/v1/wishlist',
    {
      productId:productID
    })
  }
  getALLWishedProducts():Observable<any>{
    return this._HttpClient.get(this.baseURL+'/api/v1/wishlist');
  }
  removeWishedItem(productID:string):Observable<any>{
    return this._HttpClient.delete(this.baseURL+`/api/v1/wishlist/${productID}`)
  }
}
