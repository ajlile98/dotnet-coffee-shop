import { Component, inject } from '@angular/core';
import { BagService } from '../../core/services/bag-service';
import { MenuItemService } from '../../core/services/menu-item-service';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders {
  protected bagService = inject(BagService);
  // private orderService = inject(OrderService);

}
