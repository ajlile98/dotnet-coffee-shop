import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MenuItem } from '../../types/menuItem';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private http = inject(HttpClient); 

  private baseUrl = environment.apiUrl;

  getMenuItems(){
    return this.http.get<MenuItem[]>(this.baseUrl + 'MenuItems');
  }

  getMenuItem(id: string){
    return this.http.get<MenuItem>(this.baseUrl + 'MenuItems/' + id);
  }
}
