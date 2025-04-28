import { Injectable } from '@angular/core';
import { levels, levelWin } from './levels-data';
import { Level } from './models/level.model';

@Injectable({ providedIn: 'root' })
export class LevelService {
  getLevels(): Level[] {
    return [...levels, levelWin] as any;
  }
}