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
    <div id="pond" [ngStyle]="styles" class="pond">
      @for(clr of frogs; track clr) {
      <app-frog [frog]="clr"></app-frog>
      }
      <div class="pads">
        @for(clr of frogs; track clr; let i = $index) {
        <app-lily-pad [pad]="clr" [style.left.%]="(i / (frogs.length - 1)) * 10">
        </app-lily-pad>
        }
      </div>
    </div>

    <!-- lily pads in the background -->
  `,
  styles: [
    `
      .pond {
        position: relative;
        width: 100%;
        height: 400;
        margin: auto;
        border: 2px solid #4a7;
        background: #acf;
        display: flex;
        /* default flex-start if no styles applied */
      }
      .pads {
        position: absolute;
        top: 0;
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

  get frogs(): string[] {
    // always one frog per pad
    return this.board.split("");
  }
}
