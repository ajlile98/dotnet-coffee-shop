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
    this.loadOrders();
  }

  private loadOrders() {
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
    const orderObservable = this.orderService.createOrder(bag);

    if(orderObservable){
      orderObservable.subscribe({
        next: (result) => {
          console.log('Order created successfully:', result);
          this.bagService.clearBag();
          this.toastService.info("Order Submitted!");
          // Refresh the orders list to show the new order immediately
          this.loadOrders();
        },
        error: (error) => {
          console.error('Failed to create order:', error);
          this.toastService.error('Failed to create order');
        }
      });
    }
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

  getBagTotal(): number {
    return this.bagService.getBag()().reduce((sum, item) => sum + item.price, 0);
  }

  // Get bag items grouped by ID with quantities
  getBagItemsWithQuantities() {
    const bagItems = this.bagService.getBag()();
    const groupedItems = new Map<string, {item: any, quantity: number}>();
    
    bagItems.forEach(item => {
      if (groupedItems.has(item.id)) {
        groupedItems.get(item.id)!.quantity++;
      } else {
        groupedItems.set(item.id, {item, quantity: 1});
      }
    });
    
    return Array.from(groupedItems.values());
  }

  // Group order items by menu item ID and sum quantities
  getGroupedOrderItems(orderItems: any[]) {
    const groupedItems = new Map<string, {item: any, totalQuantity: number, totalPrice: number}>();
    
    orderItems.forEach(orderItem => {
      const menuItemId = orderItem.menuItem.id;
      if (groupedItems.has(menuItemId)) {
        const existing = groupedItems.get(menuItemId)!;
        existing.totalQuantity += orderItem.quantity;
        existing.totalPrice += orderItem.priceAtTime * orderItem.quantity;
      } else {
        groupedItems.set(menuItemId, {
          item: orderItem,
          totalQuantity: orderItem.quantity,
          totalPrice: orderItem.priceAtTime * orderItem.quantity
        });
      }
    });
    
    return Array.from(groupedItems.values());
  }
}
