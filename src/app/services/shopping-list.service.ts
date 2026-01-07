import { effect, Injectable, signal } from '@angular/core';
import { Item } from '../model/item';
import { List } from '../model/list';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  currentList = signal<List>(this.loadFromStorage('current-list', {
    id: crypto.randomUUID(),
    name: "Ma liste",
    items: []
  }));

  savedLists = signal<List[]>(this.loadFromStorage('saved-lists', []));

  constructor() {
    effect(() => {
      localStorage.setItem('current-list', JSON.stringify(this.currentList()));
      localStorage.setItem('saved-lists', JSON.stringify(this.savedLists()));
    });
  }

  private loadFromStorage<T>(key: string, defaultValue: T): T {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }

  addItem(newItemPartial: Omit<Item, 'id' | 'basket'>) {
    this.currentList.update(list => {
      const exists = list.items.some(
        item => item.name.toLowerCase() === newItemPartial.name.toLowerCase()
      );

      if (exists) return list;

      const newItem: Item = {
        ...newItemPartial,
        id: crypto.randomUUID(),
        basket: false
      };

      return { ...list, items: [newItem, ...list.items] };
    });
  }

  removeItem(itemId: string) {
    this.currentList.update(list => ({
      ...list,
      items: list.items.filter(item => item.id !== itemId)
    }));
  }

  toggleItem(itemId: string) {
    this.currentList.update(list => {
      const itemToToggle = list.items.find(i => i.id === itemId);

      if (!itemToToggle) {
        return list;
      }

      const updatedItem = { ...itemToToggle, basket: !itemToToggle.basket };
      const otherItems = list.items.filter(i => i.id !== itemId);

      return {
        ...list,
        items: [updatedItem, ...otherItems]
      };
    });
  }

  saveCurrentList(name: string) {
    if (name.trim()) {
      const newList: List = {
        id: crypto.randomUUID(),
        name,
        items: this.currentList().items.map(item => ({
          ...item,
          id: crypto.randomUUID(),
          basket: false
        }))
      };

      if (!this.savedLists().some(l => l.name.toLowerCase() === name.toLowerCase())) {
        this.savedLists.update(lists => [...lists, newList]);
      }
    }
  }

  loadSavedList(list: List) {
    // On recrée des IDs pour la liste courante
    const loadedList: List = {
      ...list,
      id: crypto.randomUUID(),
      items: list.items.map(i => ({ ...i, id: crypto.randomUUID() }))
    };
    this.currentList.set(loadedList);
  }

  deleteSavedList(listId: string) {
    this.savedLists.update(lists => lists.filter(l => l.id !== listId));
  }

  getSavedList(listId: string): List | undefined {
    return this.savedLists().find(l => l.id === listId);
  }

  addItemToSavedList(listId: string, newItemPartial: Omit<Item, 'id' | 'basket'>) {
    this.savedLists.update(lists => {
      return lists.map(list => {
        if (list.id !== listId) return list;

        const exists = list.items.some(
          item => item.name.toLowerCase() === newItemPartial.name.toLowerCase()
        );
        if (exists) return list;

        const newItem: Item = {
          ...newItemPartial,
          id: crypto.randomUUID(),
          basket: false
        };

        return { ...list, items: [newItem, ...list.items] };
      });
    });
  }

  removeItemFromSavedList(listId: string, itemToRemove: Item) {
    this.savedLists.update(lists => {
      return lists.map(list => {
        if (list.id !== listId) return list;
        return {
          ...list,
          items: list.items.filter(item => item.id !== itemToRemove.id)
        };
      });
    });
  }
}
