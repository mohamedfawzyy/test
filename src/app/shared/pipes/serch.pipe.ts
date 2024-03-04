import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'serch'
})
export class SerchPipe implements PipeTransform {

  transform(products:Product[],serchTerm:string): Product[] {
     
    return products.filter((product)=>product.title.toLowerCase().includes(serchTerm.toLowerCase()));
  }

}
