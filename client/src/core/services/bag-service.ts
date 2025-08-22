import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../../types/menuItem';

@Injectable({
  providedIn: 'root'
})
export class BagService {
  protected bag = signal<MenuItem[]>([]);

  constructor() {
    const savedBag = localStorage.getItem('bag');
    if (savedBag){
      this.bag.set(JSON.parse(savedBag));
    }
  }
  
  addItem(item: MenuItem){
    let newBag = [...this.bag()]; // Create a copy using spread operator
    newBag.push(item);
    this.setBag(newBag);
  }

  removeItem(item: MenuItem){
    let newBag: MenuItem[] = this.bag().filter(x => item.id !== x.id);
    this.setBag(newBag);
  }

  setBag(bag: MenuItem[]){
    localStorage.setItem('bag', JSON.stringify(bag));
    this.bag.set(bag);
  }

  getBag(){
    return this.bag;
  }
  
  clearBag(){
    this.bag.set([]);
  }
}
