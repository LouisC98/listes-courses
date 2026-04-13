import {ChangeDetectionStrategy, Component, computed, inject, input, signal, WritableSignal} from '@angular/core';
import {ShoppingListService} from '../services/shopping-list.service';
import {Router, RouterLink} from '@angular/router';
import {SearchItem} from '../search-item/search-item';
import {Item} from '../model/item';
import {List} from '../model/list';

@Component({
  selector: 'app-view-list',
  imports: [
    RouterLink,
    SearchItem
  ],
  templateUrl: './view-list.html',
  styleUrl: './view-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewList {
  private readonly shoppingListService: ShoppingListService = inject(ShoppingListService);
  private readonly router: Router = inject(Router);

  listId = input<string>();

  list = computed(() => {
    const id = this.listId();
    return id ? this.shoppingListService.savedLists().find(l => l.id === id) : undefined;
  });

  isRenaming: WritableSignal<boolean> = signal<boolean>(false);
  renameValue: WritableSignal<string> = signal<string>('');
  renameError: WritableSignal<string> = signal<string>('');

  startRenaming(currentName: string) {
    this.renameValue.set(currentName);
    this.renameError.set('');
    this.isRenaming.set(true);
  }

  confirmRename() {
    const id = this.listId();
    if (id && this.renameValue().trim()) {
      const result = this.shoppingListService.renameSavedList(id, this.renameValue());
      if (result.duplicate) {
        this.renameError.set('Une liste avec ce nom existe déjà.');
        return;
      }
    }
    this.renameError.set('');
    this.isRenaming.set(false);
  }

  cancelRename() {
    this.renameError.set('');
    this.isRenaming.set(false);
  }

  removeItem(item: Item): void {
    const id = this.listId();
    if (id) this.shoppingListService.removeItemFromSavedList(id, item)
  }

  loadList(list: List) {
    if (confirm('Utiliser cette liste va écraser la liste en cours. Voulez-vous continuer ?')) {
      this.shoppingListService.loadSavedList(list);
      this.router.navigate(['/']);
    }
  }
}
