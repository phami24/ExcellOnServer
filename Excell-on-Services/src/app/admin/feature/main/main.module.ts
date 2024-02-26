// app.module.ts
import { NgModule } from '@angular/core';
import { MainService } from './services/main.service'; 

@NgModule({
  // ...
  providers: [MainService],
  // ...
})
export class MainModule { }
