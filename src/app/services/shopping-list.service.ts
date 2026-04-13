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
    effect(() => localStorage.setItem('current-list', JSON.stringify(this.currentList())));
    effect(() => localStorage.setItem('saved-lists', JSON.stringify(this.savedLists())));
  }

  private loadFromStorage<T>(key: string, defaultValue: T): T {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue;
    try {
      return JSON.parse(stored);
    } catch {
      return defaultValue;
    }
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

  renameCurrentList(name: string): { success: boolean; duplicate: boolean } {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, duplicate: false };

    const duplicate = this.savedLists().some(l => l.name.toLowerCase() === trimmed.toLowerCase());
    if (duplicate) return { success: false, duplicate: true };

    this.currentList.update(list => ({ ...list, name: trimmed }));
    return { success: true, duplicate: false };
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

    const trimmedName = name.trim();

    if (existingIndex !== -1 && overwrite) {
      this.savedLists.update(lists => {
        const updatedLists = [...lists];
        updatedLists[existingIndex] = {
          ...updatedLists[existingIndex],
          name: trimmedName,
          items: newItems
        };
        return updatedLists;
      });
    } else {
      const newList: List = {
        id: crypto.randomUUID(),
        name: trimmedName,
        items: newItems
      };
      this.savedLists.update(lists => [...lists, newList]);
    }

    this.currentList.update(list => ({ ...list, name: trimmedName }));

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

  renameSavedList(listId: string, name: string): { success: boolean; duplicate: boolean } {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, duplicate: false };

    const duplicate = this.savedLists().some(l => l.id !== listId && l.name.toLowerCase() === trimmed.toLowerCase());
    if (duplicate) return { success: false, duplicate: true };

    this.savedLists.update(lists =>
      lists.map(l => l.id === listId ? { ...l, name: trimmed } : l)
    );
    return { success: true, duplicate: false };
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
