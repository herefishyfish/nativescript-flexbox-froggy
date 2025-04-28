import { Component, input, NO_ERRORS_SCHEMA, output } from "@angular/core";
import { Level } from "@nativescript/core/profiling";

@Component({
  selector: "app-level-selector",
  template: `<ul class="levels">
    <Text>Level Selector</Text>
    @for (lvl of levels(); track lvl; let i = $index) {
    <li [class.active]="i === currentIndex" (tap)="onSelect(i)">
      {{ lvl.name }}
    </li>
    } 
  </ul>`,
  styles: [
    `
      .levels {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .levels li {
        padding: 0.25rem 0.5rem;
        background: #eee;
        border-radius: 4px;
        cursor: pointer;
      }
      .levels li.active {
        background: #8bc34a;
        color: white;
      }
    `,
],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LevelSelectorComponent {
  levels = input<Level[]>([]);
  currentIndex = input<number>(0);
  selectLevel = output<number>();

  onSelect(i: number) {
    this.selectLevel.emit(i);
  }
}
