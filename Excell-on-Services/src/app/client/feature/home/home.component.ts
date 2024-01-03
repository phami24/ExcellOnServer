import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ClientService } from '../../services/client.service';
import { HttpClient } from '@angular/common/http';
import { Banner } from 'src/app/interfaces/banner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  banner?: Banner[];
  // currentBook: Banner = {};
  currentIndex = -1;
  title = '';

  constructor(private clientServices: ClientService) {}

  ngOnInit(): void {
    this.retrieveBooks();
  }

  retrieveBooks(): void {
    this.clientServices.getBanner().subscribe({
      next: (data) => {
        this.banner = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }


  
}
