import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";

@Component({
  selector: 'app-root',
  imports: [Nav],
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
      return lastValueFrom(this.http.get('https://localhost:5001/api/users'));
    } catch (error){
      console.log(error);
      throw error;
    }
  }
  
}
