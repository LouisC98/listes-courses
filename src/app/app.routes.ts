import { Routes } from '@angular/router';
import { CurrentList } from './current-list/current-list';
import { SavedLists } from './saved-lists/saved-lists';
import {ViewList} from './view-list/view-list';

export const routes: Routes = [
  { path: '', component: CurrentList },
  { path: 'lists', component: SavedLists },
  { path: 'list/:listId', component: ViewList },
];
