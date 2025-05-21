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
    <div class="flex flex-col flex-grow flex-wrap w-full h-full">
      <!-- <div class="flex mb-1 flex-shrink" [innerView]="level().instructions['en']"></div> -->
  
      <div class="editor">
        <textfield [(ngModel)]="cssCode" (ngModelChange)="onChange()"></textfield>
      </div>
  
      <app-board class="flex flex-grow flex-wrap flex-col w-full h-full" [board]="level().board" [styles]="parseStyles()"> </app-board>
    </div>
  `,
  styles: [
    `
      .host {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        // flex-direction: column;
        padding: 10;
        gap: 2;
      }

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

  onChange() {
    
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
