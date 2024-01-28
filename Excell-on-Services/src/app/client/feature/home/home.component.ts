import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import Swiper from 'swiper';
import { HomeService } from '../../services/home/home.service';
import { Service } from 'src/app/interfaces/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  service?: Service[];
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getService();
  }
  getService(): void {
    this.homeService.getService().subscribe({
      next: (data) => {
        this.service = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  
  colors: { [key: string]: string }[] = [
    { color1: "#ff4848" },
    { color2: "#71a37c" },
    { color3: "#66b4ff" },
  ];
  
  getColor(index: number): string {
    return this.colors[index][`color${index + 1}`];
  }
  
  
  imageService = [
    { imageSrc: '../../../assets/images/InBound.gif', altText: 'In-Bound' },
    { imageSrc: '../../../assets/images/teleSale.gif', altText: 'Out-Bound' },
    { imageSrc: '../../../assets/images/OutBound.gif', altText: 'Tele Sale' },   
  ];
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  customers = [
    { imageSrc: '../../../assets/images/Customer1.jpg', altText: 'Customer 1' },
    { imageSrc: '../../../assets/images/Customer2.jpg', altText: 'Customer 2' },
    { imageSrc: '../../../assets/images/Customer3.jpg', altText: 'Customer 3' },
    { imageSrc: '../../../assets/images/Customer4.jpg', altText: 'Customer 4' },
    { imageSrc: '../../../assets/images/Customer5.jpg', altText: 'Customer 5' },
    { imageSrc: '../../../assets/images/Customer6.jpg', altText: 'Customer 6' },
    { imageSrc: '../../../assets/images/Customer7.jpg', altText: 'Customer 7' },
    { imageSrc: '../../../assets/images/Customer8.jpg', altText: 'Customer 8' },
    { imageSrc: '../../../assets/images/Customer9.jpg', altText: 'Customer 9' },
    {
      imageSrc: '../../../assets/images/Customer10.jpg',
      altText: 'Customer 10',
    },
  ];

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private initSwiper(): void {
    const swiperEl = this.swiperContainer.nativeElement;

    const swiperParams = {
      slidesPerView: 1,
      breakpoints: {
        1200: {
          slidesPerView: 6,
        },
        992: {
          slidesPerView: 4,
        },
        450: {
          slidesPerView: 3,
        },
        0: {
          slidesPerView: 2,
        },
      },
      on: {
        init() {
          // Additional initialization logic if needed
        },
      },
    };

    new Swiper(swiperEl, swiperParams);
  }
}
