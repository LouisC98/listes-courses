import { computed, effect, Injectable, signal } from '@angular/core';
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

  uncheckedCount = computed(() =>
    this.currentList().items.filter(i => !i.basket).length
  );

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
    this.currentList.update(list => ({
      ...list,
      items: list.items.map(i =>
        i.id === itemId ? { ...i, basket: !i.basket } : i
      )
    }));
  }

  renameCurrentList(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    this.currentList.update(list => ({ ...list, name: trimmed }));
  }

  saveCurrentList(name: string, overwrite: boolean = false): { success: boolean; duplicate: boolean } {
    if (!name.trim()) return { success: false, duplicate: false };

    const existingIndex = this.savedLists().findIndex(l => l.name.toLowerCase() === name.toLowerCase());

    if (existingIndex !== -1 && !overwrite) {
      return { success: false, duplicate: true };
    }

    const newItems = this.currentList().items.map(item => ({
      ...item,
      id: crypto.randomUUID(),
      basket: false
    }));

    if (existingIndex !== -1 && overwrite) {
      this.savedLists.update(lists => {
        const updatedLists = [...lists];
        updatedLists[existingIndex] = {
          ...updatedLists[existingIndex],
          name,
          items: newItems
        };
        return updatedLists;
      });
    } else {
      const newList: List = {
        id: crypto.randomUUID(),
        name,
        items: newItems
      };
      this.savedLists.update(lists => [...lists, newList]);
    }

    this.renameCurrentList(name);

    return { success: true, duplicate: false };
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

  renameSavedList(listId: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    this.savedLists.update(lists =>
      lists.map(l => l.id === listId ? { ...l, name: trimmed } : l)
    );
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
