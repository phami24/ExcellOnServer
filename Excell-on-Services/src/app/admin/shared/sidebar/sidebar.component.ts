import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setupSidebarDropdown();
  }

  private setupSidebarDropdown() {
    const dropdownToggleElements = this.el.nativeElement.querySelectorAll('.sidebar-dropdown-toggle');
    // @ts-ignore
    dropdownToggleElements.forEach(item => {
      this.renderer.listen(item, 'click', (event: Event) => {
        event.preventDefault();
        const parent = item.closest('.group');
        if (parent.classList.contains('selected')) {
          parent.classList.remove('selected');
        }else {
          document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function(i) {
            i.closest('.group')?.classList.remove('selected');
          })
          parent.classList.add('selected');
        }
      });
    });
  }
}
