import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './feature/main/main.component';



const routes: Routes = [
  {
    path:'', 
    redirectTo:'/main', 
    pathMatch: 'full'  
  },
  {
    path: 'main', 
    component: MainComponent ,
    data: {title: 'Main page'}    
  },
  // {
  //   path: 'main', 
  //   component: StaffComponent ,
  //   data: {title: 'Main page'}    
  // },
  // {
  //   path: 'main', 
  //   component: ClientsComponent ,
  //   data: {title: 'Main page'}    
  // },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
