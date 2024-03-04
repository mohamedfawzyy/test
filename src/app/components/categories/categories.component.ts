import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/shared/interfaces/product';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit   {
  categories:Category []=[];

  constructor(private _GetDataService:GetDataService) {}
  ngOnInit(): void {
    this._GetDataService.getCategories().subscribe({
      next:(response)=>
      {
        this.categories=response.data;
      },
      error:(err)=>{console.log(err);
      }
    })
  }
  
}
