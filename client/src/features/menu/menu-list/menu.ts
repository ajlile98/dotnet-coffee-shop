import { MenuItemService } from '../../../core/services/menu-item-service';
import { MenuItem } from '../../../types/menuItem';
import { Component, inject, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {
  private menuItemService = inject(MenuItemService); 
  protected menuItems = signal<MenuItem[]>([]);

  ngOnInit() {
    this.getMenu();
  }

  getMenu(){
    this.menuItemService.getMenuItems().subscribe({
      next: response => {
        console.log(response);
        this.menuItems.set(response);
        // this.cancel();
      },
      error: error => console.log(error)
  });
  }
}
