import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import foodDrinksJson from '../../data/food-drinks-fr.json';
import {Item} from '../model/item';
import {NgOptimizedImage} from '@angular/common';
import {ShoppingListService} from '../services/shopping-list.service';

@Component({
  selector: 'app-search-item',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './search-item.html',
  styleUrl: './search-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchItem {
  private readonly shoppingListService = inject(ShoppingListService);

  targetListId = input<string>();

  searchInput = signal<string>('');
  private readonly foodDrinksData = foodDrinksJson;

  filteredFood = computed(() => {
    const search = this.searchInput().toLowerCase().trim();

    if (search.length < 2) {
      return [] as Omit<Item, 'id'>[];
    }

    return this.foodDrinksData
      .filter((item) =>
        item.annotation_fr?.toLowerCase().includes(search) ||
        item.tags_fr?.some(tag => tag.toLowerCase().includes(search))
      )
      .map(item => ({
        name: item.annotation_fr ?? '',
        emoji: item.emoji,
        basket: false
      }));
  });

  selectItem(itemSelected: Omit<Item, 'id'>) {
    const listId = this.targetListId();
    const itemForService = { name: itemSelected.name, emoji: itemSelected.emoji };

    if (listId) {
      this.shoppingListService.addItemToSavedList(listId, itemForService);
    } else {
      this.shoppingListService.addItem(itemForService);
    }
    this.searchInput.set('');
  }

  addManualItem() {
    const name = this.searchInput().trim();
    if (!name) return;

    const existingItem = this.filteredFood().find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );

    if (existingItem) {
      this.selectItem(existingItem);
    } else {
      const newItem = {
        name: name,
        emoji: '🛒'
      };

      const listId = this.targetListId();
      if (listId) {
        this.shoppingListService.addItemToSavedList(listId, newItem);
      } else {
        this.shoppingListService.addItem(newItem);
      }
      this.searchInput.set('');
    }
  }
}
