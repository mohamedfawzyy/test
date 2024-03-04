import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdarePasswordComponent } from './updare-password/updare-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {path:"",redirectTo:"update",pathMatch:"full"},
  {path:"update",component:UpdarePasswordComponent},
  {path:"forget",component:ForgetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
