import { Component, ElementRef, Renderer2,  } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Popper from 'popper.js';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../State/index';
import * as fromAdmin from '../../../State/admin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  isLoggedOut!: boolean;
  userEmail$: Observable<string> = new Observable();
  constructor(
    private store: Store<fromRoot.IAppState>,
    private router: Router,
    private el: ElementRef, private renderer: Renderer2
  ) {
    
  }

  ngOnInit(): void {
    this.userEmail$ = this.store.select(fromAdmin.getUserEmail);
    this.store.select(fromAdmin.getIsLoggedOut).subscribe((isLoggedOut) => {
      this.isLoggedOut = isLoggedOut;
    });
  }
  logout() {
    this.store.dispatch(new fromAdmin.Logout());
  }
  
  
  isSearchVisible: boolean = false;
  isNotificationVisible: boolean = false;
  isProfileVisible: boolean = false;
  toggleNotification() {
    this.isNotificationVisible = !this.isNotificationVisible;
  }
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }
  toggleProfile() {
    this.isProfileVisible = !this.isProfileVisible;
  }
  ngAfterViewInit() {
    this.setupPopper();
    this.setTap();
  }

  private setTap() {
    document.querySelectorAll('[data-tab]').forEach(function(item) {
      const element = item as HTMLElement;
  
      element.addEventListener('click', function(e) {
        e.preventDefault();
  
        const tab = element.dataset['tab'];
        const page = element.dataset['tabPage'];
        const target = document.querySelector('[data-tab-for="'+tab+'"][data-page="'+page+'"]') as HTMLElement;
        
        document.querySelectorAll('[data-tab-for="'+tab+'"]').forEach(function(i){
          (i as HTMLElement).classList.remove('active');
        });
        
        document.querySelectorAll('[data-tab-for="'+page+'"]').forEach(function(i){
          (i as HTMLElement).classList.add('hidden');
        });
        
        element.classList.add('active');
        target?.classList.remove('hidden');
      });
    });
  }
  
  
  
  private setupPopper() {
    const popperInstance: { [key: string]: any } = {};

    document.querySelectorAll('.dropdown').forEach((item: Element, index: number) => {
      const popperId = 'popper-' + index;
      const toggle = item.querySelector('.dropdown-toggle') as HTMLElement; 
      const menu = item.querySelector('.dropdown-menu') as HTMLElement;
      if (menu) {
        (menu as HTMLElement).dataset['popperId'] = popperId;

        if (toggle && menu) {
          popperInstance[popperId] = (Popper as any).createPopper(toggle, menu, {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 8],
                },
              },
              {
                name: 'preventOverflow',
                options: {
                  padding: 24,
                },
              },
            ],
            placement: 'bottom-end',
          });
        }
      }
    });

    document.addEventListener('click', function(e) {
      const toggle = (e.target as HTMLElement)?.closest('.dropdown-toggle');
      const menu = (e.target as HTMLElement)?.closest('.dropdown-menu');
      if (toggle && menu) {
        const menuEl = (toggle.closest('.dropdown') as HTMLElement)?.querySelector('.dropdown-menu') as HTMLElement;
        const popperId = menuEl?.dataset['popperId']!;
        if (menuEl.classList.contains('hidden')) {
          hideDropdown();
          menuEl.classList.remove('hidden');
          showPopper(popperId);
        } else {
          menuEl.classList.add('hidden');
          hidePopper(popperId);
        }
      } else if (!menu) {
        hideDropdown();
      }
    });

    function hideDropdown() {
      document.querySelectorAll('.dropdown-menu').forEach(function(item) {
        item.classList.add('hidden');
      });
    }

    function showPopper(popperId: string) {
      popperInstance[popperId]?.setOptions({
        ...popperInstance[popperId]?.options,
        modifiers: [
          ...popperInstance[popperId]?.options.modifiers,
          { name: 'eventListeners', enabled: true },
        ],
      });
      popperInstance[popperId]?.update();
    }

    function hidePopper(popperId: string) {
      popperInstance[popperId]?.setOptions({
        ...popperInstance[popperId]?.options,
        modifiers: [
          ...popperInstance[popperId]?.options.modifiers,
          { name: 'eventListeners', enabled: true },
        ],
      });
      popperInstance[popperId]?.update();
    }
  }
}