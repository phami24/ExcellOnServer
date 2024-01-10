import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-services-pricing',
  templateUrl: './services-pricing.component.html',
  styleUrls: ['./services-pricing.component.css'],
})
export class ServicesPricingComponent implements OnInit  {
  openTab: number = 1;
  ngOnInit(): void {
    initFlowbite();
  }
}
