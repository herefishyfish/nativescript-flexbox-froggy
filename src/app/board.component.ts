import { NgStyle } from "@angular/common";
import { Component, Input, input } from "@angular/core";
import { FrogComponent } from "./frog.component";
import { LilyPadComponent } from "./lilypad.component";
import { View } from "@triniwiz/nativescript-masonkit";
import { registerElement } from "@nativescript/angular";
import { CSSType } from "@nativescript/core";

registerElement("app-board", () => BoardComponent);

@CSSType("app-board")
@Component({
  selector: "app-board",
  template: `
    <!-- frogs are flex-items -->
    <div [ngStyle]="styles" class="pond">
      @for(clr of frogs; track clr) {
        <app-frog [frog]="clr" />
      }
      <div class="pads">
        @for(clr of frogs; track clr; let i = $index) {
          <app-lily-pad [pad]="clr" [style.left.%]="(i / (frogs.length - 1)) * 80" />
        }
      </div>
    </div>

    <!-- lily pads in the background -->
  `,
  styles: [
    `
      :host {
        display: flex;
        height: 400;
        width: 100%;
        min-height: 400;
      }

      .pond {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 400;
        border: 2px solid #4a7;
        background-color: #acf;
        display: flex;
        /* default flex-start if no styles applied */
      }

      .pads {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  imports: [NgStyle, FrogComponent, LilyPadComponent],
})
export class BoardComponent extends View {
  @Input() board: string = ""; 
  @Input() styles: { [k: string]: any } = {};
  // board = input<string>(""); 
  // styles = input<{ [k: string]: any }>({});

  // boardView = inject(View) // Assuming 'View' is the correct dependency to inject

  // ngOnChanges() {
  //   const board: View = this.boardView;
  // }

  get frogs(): string[] {
    // always one frog per pad
    return this.board.split("");
  }
}
