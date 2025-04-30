import { Routes } from '@angular/router';

import { GameComponent } from './game.component';

export const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: GameComponent },
];
