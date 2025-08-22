import { Component, inject, signal } from '@angular/core';
import { MenuItemService } from '../../../core/services/menu-item-service';
import { MenuItem } from '../../../types/menuItem';
import { ActivatedRoute } from '@angular/router';
import { NotFound } from '../../../shared/errors/not-found/not-found';
import { BagService } from '../../../core/services/bag-service';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-menu-detailed',
  imports: [],
  templateUrl: './menu-detailed.html',
  styleUrl: './menu-detailed.css'
})
export class MenuDetailed {
  private menuItemService = inject(MenuItemService); 
  protected bagService = inject(BagService);
  private toastService = inject(ToastService);
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
  
  addMenuItemToBag(){
    const item = this.menuItem();
    if (item !== null){
      this.bagService.addItem(item);
      this.toastService.info(`Added ${item.name} to bag!`)
    }
  }

}
