import {
  Component,
  computed,
  NO_ERRORS_SCHEMA,
  OnInit,
  signal,
} from "@angular/core";
import { LevelService } from "./level.service";
import { Level } from "./models/level.model";
import { LevelSelectorComponent } from "./level-selector.component";
import { LevelViewerComponent } from "./level-viewer.component";

@Component({
  selector: "app-game",
  template: `
    <div class="game flex flex-col flex-grow flex-wrap">
      <div class="">
        <h1>Flexbox Game</h1>
  
        <!-- <app-level-selector
          [levels]="levels"
          [currentIndex]="currentIndex"
          (selectLevel)="select($event)"
        /> -->
  
        <app-level-viewer class="w-full" [level]="level()" />
      </div>

      <div class="controls">
        <button (tap)="prev()" [disabled]="currentIndex() === 0">← Prev</button>
        <button
          (tap)="next()"
          [disabled]="currentIndex() === levels.length - 1"
        >
          Next →
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .game {
        display: flex;
        margin: auto;
        flex-direction: column;
      }
      .controls {
        text-align: center;
        margin-top: 1;
      }
      .controls button {
        margin: 0 0.5;
      }
    `,
  ],
  imports: [LevelSelectorComponent, LevelViewerComponent],
  providers: [LevelService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class GameComponent implements OnInit {
  levels: Level[] = [];
  currentIndex = signal(0);
  level = computed(() => this.levels[this.currentIndex()]);

  constructor(private svc: LevelService) {}

  ngOnInit() {
    this.levels = this.svc.getLevels();
  }

  select(i: number) {
    this.currentIndex.set(i);
  }
  prev() {
    const current = this.currentIndex();
    if (current > 0) {
      this.currentIndex.set(current - 1);
    }
  }
  next() {
    // if (this.currentIndex < this.levels.length - 1) this.currentIndex++;
    const current = this.currentIndex();
    if (current < this.levels.length - 1) {
      this.currentIndex.set(current + 1);
    }
  }
}
