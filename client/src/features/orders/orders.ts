import { ToastService } from './../../core/services/toast-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { BagService } from '../../core/services/bag-service';
import { MenuItemService } from '../../core/services/menu-item-service';
import { OrderService } from '../../core/services/order-service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-orders',
  imports: [DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {
  protected bagService = inject(BagService);
  private orderService = inject(OrderService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  protected orders = signal<any[]>([]);

  ngOnInit(){
    this.orderService.getOrders().subscribe({
      next: orders => {
        console.log("Orders:");
        console.log(orders);
        // Sort orders by creation date in descending order (newest first)
        const sortedOrders = orders.sort((a: any, b: any) => 
          new Date(b.created).getTime() - new Date(a.created).getTime()
        );
        this.orders.set(sortedOrders);
      },
      error: error => console.log(error)
    })
  }

  submitOrder(){
    const bag = this.bagService.getBag()();
    this.orderService.createOrder(bag);
    this.bagService.clearBag();
    this.toastService.info("Order Submitted!")
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'preparing': return 'primary';
      case 'ready': return 'success';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'neutral';
    }
  }

  cancelOrder(orderId: number) {
    // Implement cancel order logic
    console.log('Cancel order:', orderId);
    this.toastService.info(`Order #${orderId} cancelled`);
  }

  viewOrderDetails(orderId: number) {
    // Navigate to order details page
    this.router.navigate(['/orders', orderId]);
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }
}
