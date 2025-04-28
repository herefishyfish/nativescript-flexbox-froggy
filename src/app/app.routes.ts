import { Routes } from '@angular/router';
import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';

import { GameComponent } from './game.component';

export const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: GameComponent },
  { path: 'item/:id', component: ItemDetailComponent },
];
