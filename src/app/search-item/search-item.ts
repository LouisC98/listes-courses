import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ShoppingListService} from '../services/shopping-list.service';
import {EmojiService} from '../services/emoji.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-item',
  imports: [
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './search-item.html',
  styleUrl: './search-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchItem {
  private readonly shoppingListService = inject(ShoppingListService);
  private readonly emojiService = inject(EmojiService);

  targetListId = input<string>();

  searchInput = signal<string>('');

  filteredFood = computed(() =>
    this.emojiService.search(this.searchInput()).map(item => ({
      name: item.label,
      emoji: item.emoji,
    }))
  );

  selectItem(itemSelected: { name: string; emoji: string }) {
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
