import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ShoppingListService} from '../services/shopping-list.service';
import {Item} from '../model/item';
import {SearchItem} from '../search-item/search-item';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-current-list',
  imports: [SearchItem, NgOptimizedImage],
  templateUrl: './current-list.html',
  styleUrl: './current-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentList {
  private readonly shoppingListService = inject(ShoppingListService);
  isSavingList = signal<boolean>(false)
  newListName = signal<string>('')

  items = computed<Item[]>(() => {
    const list = this.shoppingListService.currentList().items;
    const notInBasket = list.filter(i => !i.basket);
    const inBasket = list.filter(i => i.basket);
    return [...notInBasket, ...inBasket];
  });

  toggleBasket(itemId: string) {
    this.shoppingListService.toggleItem(itemId);
  }

  removeItem(event: Event, itemId: string) {
    event.stopPropagation();
    this.shoppingListService.removeItem(itemId);
  }

  startSaveList() {
    this.isSavingList.set(true)
  }

  endSavingList(event: Event) {
    if (event.target === event.currentTarget) {
      this.isSavingList.set(false);
    }
  }

  saveList(event: Event) {
    event.preventDefault();
    this.shoppingListService.saveCurrentList(this.newListName())
    this.newListName.set('')
    this.isSavingList.set(false)
  }
}
