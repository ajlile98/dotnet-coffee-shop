import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = 'Coffee Shop';
  protected customers = signal<User[]>([]);

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async ngOnInit() {
    this.customers.set(await this.getCustomers());
    this.setCurrentUser();
  }

  getCustomers() {
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/users'));
    } catch (error){
      console.log(error);
      throw error;
    }
  }
  
}
