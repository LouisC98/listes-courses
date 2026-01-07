import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {ShoppingListService} from '../services/shopping-list.service';
import {Router, RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {SearchItem} from '../search-item/search-item';
import {Item} from '../model/item';
import {List} from '../model/list';

@Component({
  selector: 'app-view-list',
  imports: [
    RouterLink,
    NgOptimizedImage,
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
    return id ? this.shoppingListService.getSavedList(id) : undefined;
  });

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
