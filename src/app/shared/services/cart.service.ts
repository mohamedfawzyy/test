import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 baseURL:string='https://ecommerce.routemisr.com';
 header:any={token:localStorage.getItem("eToken")}
  constructor(private _HttpClient:HttpClient) { }

  addToCart(productId:string):Observable<any>{
    return this._HttpClient.post(this.baseURL+'/api/v1/cart',
    {
      "productId":productId
    })
  }
  getUserCart():Observable<any>{
    return this._HttpClient.get(this.baseURL+"/api/v1/cart");
  }

  removeCartProduct(prductID:string):Observable<any>{
    return this._HttpClient.delete(this.baseURL+`/api/v1/cart/${prductID}`)
  }

  updateCartQuantity(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(this.baseURL+`/api/v1/cart/${productId}`,
    {
      "count": `${count}`
    },)
  }


  checkoutPayment(cartId:string,details:object):Observable<any>{
    return this._HttpClient.post(this.baseURL+`/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      shippingAddress:details
    },
    
    )
  }
}
