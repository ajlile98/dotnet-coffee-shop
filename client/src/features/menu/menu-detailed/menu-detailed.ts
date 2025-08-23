import { Component, inject, signal, OnInit } from '@angular/core';
import { MenuItemService } from '../../../core/services/menu-item-service';
import { MenuItem } from '../../../types/menuItem';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFound } from '../../../shared/errors/not-found/not-found';
import { BagService } from '../../../core/services/bag-service';
import { ToastService } from '../../../core/services/toast-service';
import { Location } from '@angular/common';

interface SizeOption {
  name: string;
  price: number;
}

@Component({
  selector: 'app-menu-detailed',
  imports: [],
  templateUrl: './menu-detailed.html',
  styleUrl: './menu-detailed.css'
})
export class MenuDetailed implements OnInit {
  private menuItemService = inject(MenuItemService); 
  protected bagService = inject(BagService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  
  protected menuItem = signal<MenuItem | null>(null);
  protected quantity = signal<number>(1);
  protected selectedSize = 'Regular';
  protected selectedTemp = 'Hot';
  
  protected sizes: SizeOption[] = [
    { name: 'Small', price: 0 },
    { name: 'Regular', price: 0 },
    { name: 'Large', price: 0.50 }
  ];
  
  protected temperatures = ['Hot', 'Iced'];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getMenuItem(id);
    } 
  }

  getMenuItem(id: string) {
    this.menuItemService.getMenuItem(id).subscribe({
      next: response => {
        console.log(response);
        if (response) {
          this.menuItem.set(response);
        }
      },
      error: error => {
        console.log(error);
        // Could navigate to 404 page here
      }
    });
  }
  
  addMenuItemToBag() {
    const item = this.menuItem();
    if (item !== null) {
      // Add item multiple times based on quantity
      for (let i = 0; i < this.quantity(); i++) {
        this.bagService.addItem({
          ...item,
          price: this.getTotalPrice() / this.quantity() // Adjusted price per item
        });
      }
      
      const quantityText = this.quantity() === 1 ? '' : ` (${this.quantity()})`;
      const sizeText = this.selectedSize === 'Regular' ? '' : ` - ${this.selectedSize}`;
      const tempText = this.isDrink(item.name) && this.selectedTemp === 'Hot' ? '' : ` - ${this.selectedTemp}`;
      
      this.toastService.info(`Added ${item.name}${sizeText}${tempText}${quantityText} to bag!`);
      
      // Reset customizations after adding to bag
      this.quantity.set(1);
      this.selectedSize = 'Regular';
      this.selectedTemp = 'Hot';
    }
  }

  goBack() {
    this.location.back();
  }

  getCategory(itemName: string): string {
    const name = itemName.toLowerCase();
    if (name.includes('coffee') || name.includes('americano') || name.includes('espresso') || name.includes('latte') || name.includes('cappuccino') || name.includes('macchiato') || name.includes('mocha') || name.includes('frappuccino') || name.includes('cold brew')) {
      return 'Coffee';
    } else if (name.includes('tea') || name.includes('chai')) {
      return 'Tea';
    } else if (name.includes('chocolate')) {
      return 'Hot Drinks';
    } else if (name.includes('croissant') || name.includes('muffin') || name.includes('bagel') || name.includes('toast') || name.includes('sandwich') || name.includes('pastry') || name.includes('cookie')) {
      return 'Food';
    }
    return 'Specialty';
  }

  selectSize(size: SizeOption) {
    this.selectedSize = size.name;
  }

  isDrink(itemName: string): boolean {
    const name = itemName.toLowerCase();
    return !name.includes('croissant') && !name.includes('muffin') && !name.includes('bagel') && 
           !name.includes('toast') && !name.includes('sandwich') && !name.includes('pastry') && 
           !name.includes('cookie');
  }

  increaseQuantity() {
    if (this.quantity() < 10) {
      this.quantity.update(q => q + 1);
    }
  }

  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  getTotalPrice(): number {
    const item = this.menuItem();
    if (!item) return 0;
    
    const basePrice = item.price;
    const sizePrice = this.sizes.find(s => s.name === this.selectedSize)?.price || 0;
    const itemPrice = basePrice + sizePrice;
    
    return Math.round((itemPrice * this.quantity()) * 100) / 100;
  }
}
