import { Component, input, NO_ERRORS_SCHEMA, OnChanges } from "@angular/core";
import { Level } from "./models/level.model";
import { BoardComponent } from "./board.component";
import { InnerViewDirective } from "./directives/inner-view.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from "@nativescript/angular";

@Component({
  selector: "app-level-viewer",
  template: `
    <!-- <Label> {{ level().instructions["en"] }} </Label> -->

    <div class="instructions" [innerView]="level().instructions['en']"></div>

    <div class="editor">
      <textfield [(ngModel)]="cssCode"></textfield>
      <!-- <textarea
        rows="6"
        [(ngModel)]="cssCode"
        placeholder="Write your flex CSS here…"
      >
      </textarea> -->
    </div>

    <div>
      <app-board [board]="level().board" [styles]="parseStyles()"> </app-board>
    </div>
  `,
  styles: [
    `
      .instructions {
        margin-bottom: 1rem;
      }
      .editor textarea {
        width: 100%;
        font-family: monospace;
        font-size: 0.9rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-bottom: 1rem;
      }
    `,
  ],
  imports: [
    BoardComponent,
    InnerViewDirective,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LevelViewerComponent implements OnChanges {
  level = input<Level>();
  cssCode = "";

  ngOnChanges() {
    const level = this.level();
    if (!level) return;

    const props = Object.entries(level.style)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n");
    this.cssCode = `${level.before}${props}\n${level.after}`;
  }

  // optional: parse user-edited CSS into a key/value map
  parseStyles(): { [k: string]: string } {
    const map: any = {};
    this.cssCode
      .split(";")
      .map((line) => line.trim())
      .filter((l) => l.includes(":"))
      .forEach((l) => {
        const [prop, val] = l.split(":").map((s) => s.trim());
        map[prop] = val;
      });
    return map;
  }
}
