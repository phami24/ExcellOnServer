import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './feature/main/main.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ClientManagementComponent } from './feature/client-management/client-management.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';



@NgModule({
  declarations: [
    MainComponent,
    ClientManagementComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports:[
    MainComponent
  ]
})
export class AdminModule { }
