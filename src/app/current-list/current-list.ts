import {ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {ShoppingListService} from '../services/shopping-list.service';
import {Item} from '../model/item';
import {SearchItem} from '../search-item/search-item';
import {List} from '../model/list';

@Component({
  selector: 'app-current-list',
  imports: [SearchItem],
  templateUrl: './current-list.html',
  styleUrl: './current-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentList {
  private readonly shoppingListService = inject(ShoppingListService);
  isSavingList: WritableSignal<boolean> = signal<boolean>(false);
  newListName: WritableSignal<string> = signal<string>(this.shoppingListService.currentList().name);
  saveError: WritableSignal<string> = signal<string>('');

  isRenamingTitle: WritableSignal<boolean> = signal<boolean>(false);
  titleRenameValue: WritableSignal<string> = signal<string>('');

  currentList: Signal<List> = this.shoppingListService.currentList.asReadonly();

  startRenamingTitle(currentName: string) {
    this.titleRenameValue.set(currentName);
    this.isRenamingTitle.set(true);
  }

  confirmRenameTitle() {
    if (this.titleRenameValue().trim()) {
      this.shoppingListService.renameCurrentList(this.titleRenameValue());
    }
    this.isRenamingTitle.set(false);
  }

  cancelRenameTitle() {
    this.isRenamingTitle.set(false);
  }

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
    this.newListName.set(this.shoppingListService.currentList().name);
    this.saveError.set('');
    this.isSavingList.set(true);
  }

  endSavingList(event: Event) {
    if (event.target === event.currentTarget) {
      this.saveError.set('');
      this.isSavingList.set(false);
    }
  }

  saveList(event: Event, overwrite: boolean = false) {
    event.preventDefault();
    const result = this.shoppingListService.saveCurrentList(this.newListName(), overwrite);
    if (result.duplicate) {
      this.saveError.set('Une liste avec ce nom existe déjà.');
      return;
    }
    if (result.success) {
      this.newListName.set(this.shoppingListService.currentList().name);
      this.saveError.set('');
      this.isSavingList.set(false);
    }
  }

}
