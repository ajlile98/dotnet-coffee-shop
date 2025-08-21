import { Component, inject, signal } from '@angular/core';
import { MenuItemService } from '../../../core/services/menu-item-service';
import { MenuItem } from '../../../types/menuItem';
import { ActivatedRoute } from '@angular/router';
import { NotFound } from '../../../shared/errors/not-found/not-found';

@Component({
  selector: 'app-menu-detailed',
  imports: [],
  templateUrl: './menu-detailed.html',
  styleUrl: './menu-detailed.css'
})
export class MenuDetailed {
  private menuItemService = inject(MenuItemService); 
  private route = inject(ActivatedRoute);
  protected menuItem = signal<MenuItem | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.getMenuItem(id);
    } 
  }

  getMenuItem(id: string){
    this.menuItemService.getMenuItem(id).subscribe({
      next: response => {
        console.log(response);
        if (response){
          this.menuItem.set(response);
        }
        // this.cancel();
      },
      error: error => console.log(error)
  });
  }

}
