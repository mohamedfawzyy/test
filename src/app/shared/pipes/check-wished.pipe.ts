import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'checkWished'
})
export class CheckWishedPipe implements PipeTransform {

  
  transform(allProducts: Product[], wishedProducts: Product[]): Product[] { 
    if(wishedProducts.length != 0){
      wishedProducts.forEach(wishedProduct => {
        for (const product of allProducts) {
          if(wishedProduct._id == product ._id){
            product.isWished=true
          }
        }
      });
    }
    return allProducts;
  }

}
