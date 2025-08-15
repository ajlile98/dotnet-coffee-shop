import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MenuItem } from '../../types/menuItem';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private http = inject(HttpClient); 
  protected menuItems = signal<MenuItem[]>([])

  baseUrl = "https://localhost:5001/api/"

  getMenuItems(){
    return this.http.get<MenuItem[]>(this.baseUrl + 'MenuItems').pipe(
      tap(menuItems => this.setMenuItems(menuItems))
    );
  }

  setMenuItems(menuItems: MenuItem[]){
    this.menuItems.set(menuItems);
  }
}
