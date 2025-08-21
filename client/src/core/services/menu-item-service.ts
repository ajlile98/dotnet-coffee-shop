import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MenuItem } from '../../types/menuItem';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private http = inject(HttpClient); 

  baseUrl = "https://localhost:5001/api/"

  getMenuItems(){
    return this.http.get<MenuItem[]>(this.baseUrl + 'MenuItems');
  }

  getMenuItem(id: string){
    return this.http.get<MenuItem>(this.baseUrl + 'MenuItems/' + id);
  }
}
