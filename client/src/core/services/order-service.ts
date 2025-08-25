import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MenuItem } from '../../types/menuItem';
import { AccountService } from './account-service';
import { tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);   
  private accountService = inject(AccountService);

  private baseUrl = 'https://localhost:5001/api/';

  createOrder(bag: MenuItem[]){
    let user = this.accountService.currentUser();
    if (!user){
      console.log("User is not logged in!");
      return throwError(() => new Error('User not logged in'));
    }
    return this.http.post(this.baseUrl + 'Order', {
      userId: user.id,
      orderItems: bag.map(item => ({
        menuItemId: item.id,
        quantity: 1, // You might want to track quantity in your bag
        priceAtTime: item.price
      }))
    }).pipe(
      tap(result => console.log('Order created:', result)),
      catchError(error => {
        console.error('Failed to create order:', error);
        return throwError(() => error);
      })
    );
  }

  getOrders(){
    return this.http.get<any>(this.baseUrl + 'Order').pipe(
      tap(orders => console.log('Orders loaded:', orders)),
      catchError(error => {
        console.error('Failed to load orders:', error);
        return throwError(() => error);
      })
    );
  }

  getOrder(id: number){
    return this.http.get(this.baseUrl + 'Order/' + id.toString()).pipe(
      tap(order => console.log('Order loaded:', order)),
      catchError(error => {
        console.error('Failed to load order:', error);
        return throwError(() => error);
      })
    );
  }
}
