import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MenuItem } from '../../types/menuItem';
import { AccountService } from './account-service';
import { tap } from 'rxjs';

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
      return;
    }
    return this.http.post(this.baseUrl + 'Order', {
      userId: user.id,
      orderItems: bag.map(item => ({
        menuItemId: item.id,
        quantity: 1, // You might want to track quantity in your bag
        priceAtTime: item.price
      }))
    }).pipe(
      tap(result => console.log('Order created:', result))
    );
  }

  getOrders(){
    return this.http.get<any>(this.baseUrl + 'Order');
  }

  getOrder(id: number){
    return this.http.get(this.baseUrl + 'Order/' + id.toString());
  }
}
