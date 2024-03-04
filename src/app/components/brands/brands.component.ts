import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/cart-details';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands:Brand [] =[];
  constructor(private _GetDataService:GetDataService) {}
  ngOnInit(): void {
     this._GetDataService.getBrands().subscribe({
      next:(response)=>
      {
       this.brands=response.data;
      },
      error:(err)=>{console.log(err);
      }
     })
  }

}
