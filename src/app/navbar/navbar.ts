import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {
  private readonly shoppingListService = inject(ShoppingListService);
  readonly uncheckedCount = this.shoppingListService.uncheckedCount;
}
