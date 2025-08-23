import { MenuItemService } from '../../../core/services/menu-item-service';
import { MenuItem } from '../../../types/menuItem';
import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { BagService } from '../../../core/services/bag-service';
import { ToastService } from '../../../core/services/toast-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {
  private menuItemService = inject(MenuItemService); 
  protected bagService = inject(BagService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  
  protected menuItems = signal<MenuItem[]>([]);
  protected selectedCategory = signal<string>('All');
  protected itemQuantities = signal<Map<string, number>>(new Map());
  protected isAdding = signal<string | null>(null);

  protected categories = ['All', 'Coffee', 'Tea', 'Food', 'Hot Drinks', 'Specialty'];
  
  // Computed property for filtered items
  protected filteredMenuItems = computed(() => {
    const items = this.menuItems();
    const category = this.selectedCategory();
    
    if (category === 'All') {
      return items;
    }
    
    return items.filter(item => this.getCategory(item.name) === category);
  });

  ngOnInit() {
    this.getMenu();
    // Initialize quantities for all items
    this.initializeQuantities();
  }

  getMenu() {
    this.menuItemService.getMenuItems().subscribe({
      next: response => {
        console.log(response);
        this.menuItems.set(response);
        this.initializeQuantities();
      },
      error: error => console.log(error)
    });
  }

  private initializeQuantities() {
    const quantities = new Map<string, number>();
    this.menuItems().forEach(item => {
      quantities.set(item.id, 1);
    });
    this.itemQuantities.set(quantities);
  }

  filterByCategory(category: string) {
    this.selectedCategory.set(category);
  }

  getCategory(itemName: string): string {
    const name = itemName.toLowerCase();
    if (name.includes('coffee') || name.includes('americano') || name.includes('espresso') || 
        name.includes('latte') || name.includes('cappuccino') || name.includes('macchiato') || 
        name.includes('mocha') || name.includes('frappuccino') || name.includes('cold brew')) {
      return 'Coffee';
    } else if (name.includes('tea') || name.includes('chai')) {
      return 'Tea';
    } else if (name.includes('chocolate')) {
      return 'Hot Drinks';
    } else if (name.includes('croissant') || name.includes('muffin') || name.includes('bagel') || 
               name.includes('toast') || name.includes('sandwich') || name.includes('pastry') || 
               name.includes('cookie')) {
      return 'Food';
    }
    return 'Specialty';
  }

  getDescription(itemName: string): string {
    const name = itemName.toLowerCase();
    if (name.includes('americano')) {
      return 'Rich espresso with hot water for a smooth, bold flavor.';
    } else if (name.includes('latte')) {
      return 'Creamy steamed milk with espresso, perfectly balanced.';
    } else if (name.includes('cappuccino')) {
      return 'Equal parts espresso, steamed milk, and milk foam.';
    } else if (name.includes('espresso')) {
      return 'Pure, concentrated coffee shot with rich crema.';
    } else if (name.includes('mocha')) {
      return 'Chocolate and espresso blend with steamed milk.';
    } else if (name.includes('croissant')) {
      return 'Flaky, buttery pastry baked fresh daily.';
    } else if (name.includes('muffin')) {
      return 'Soft, moist muffin made with the finest ingredients.';
    } else if (name.includes('tea')) {
      return 'Premium tea blend, perfectly steeped for your enjoyment.';
    }
    return 'Crafted with care using premium ingredients.';
  }

  getQuantity(itemId: string): number {
    return this.itemQuantities().get(itemId) || 1;
  }

  increaseQuantity(itemId: string) {
    const quantities = new Map(this.itemQuantities());
    const current = quantities.get(itemId) || 1;
    if (current < 10) {
      quantities.set(itemId, current + 1);
      this.itemQuantities.set(quantities);
    }
  }

  decreaseQuantity(itemId: string) {
    const quantities = new Map(this.itemQuantities());
    const current = quantities.get(itemId) || 1;
    if (current > 1) {
      quantities.set(itemId, current - 1);
      this.itemQuantities.set(quantities);
    }
  }

  quickAddToBag(item: MenuItem, event: Event) {
    event.stopPropagation();
    this.addToBag(item);
  }

  addToBag(item: MenuItem) {
    const quantity = this.getQuantity(item.id);
    this.isAdding.set(item.id);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      // Add the item multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        this.bagService.addItem(item);
      }
      
      const quantityText = quantity === 1 ? '' : ` (${quantity})`;
      this.toastService.info(`Added ${item.name}${quantityText} to bag!`);
      
      // Reset quantity to 1 after adding
      const quantities = new Map(this.itemQuantities());
      quantities.set(item.id, 1);
      this.itemQuantities.set(quantities);
      
      this.isAdding.set(null);
    }, 300);
  }

  viewDetails(itemId: string) {
    this.router.navigate(['/menu', itemId]);
  }

  goToBag() {
    this.router.navigate(['/orders']);
  }
}
