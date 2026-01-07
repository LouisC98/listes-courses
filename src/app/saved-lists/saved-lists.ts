import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {ShoppingListService} from '../services/shopping-list.service';
import {List} from '../model/list';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-saved-lists',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './saved-lists.html',
  styleUrl: './saved-lists.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedLists {
  private readonly shoppingListService: ShoppingListService = inject(ShoppingListService);
  private readonly router: Router = inject(Router);

  savedLists = computed<List[]>(() => this.shoppingListService.savedLists());

  deleteList(list: List) {
    this.shoppingListService.deleteSavedList(list.id);
  }

  loadList(list: List) {
    if (confirm('La liste en cours d\'utilisation va être écrasée. Êtes-vous sûr ?')) {
      this.shoppingListService.loadSavedList(list);
      this.router.navigate(['/']);
    }
  }
}
