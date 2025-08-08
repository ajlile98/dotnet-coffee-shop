import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = 'Coffee Shop';
  protected customers = signal<any>([]);

  async ngOnInit() {
    this.customers.set(await this.getCustomers())
  }

  getCustomers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/customers'));
    } catch (error){
      console.log(error);
      throw error;
    }
  }
  
}
