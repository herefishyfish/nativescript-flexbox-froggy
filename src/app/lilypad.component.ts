import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { CSSType } from "@nativescript/core";
import { View } from "@triniwiz/nativescript-masonkit";

registerElement("app-lily-pad", () => LilyPadComponent);

@CSSType("app-lily-pad")
@Component({
  selector: "app-lily-pad",
  template: ` <Image [src]="src" class="pad" /> `,
  styles: [
    `
      :host {
        position: absolute;
        bottom: 0;
        width: 80;
        height: 80;
        transform: translateX(0%);
        pointer-events: none;
      }
    `,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LilyPadComponent extends View {
  @Input() pad: "g" | "y" | "r" = "g";
  get src() {
    return `~/assets/lilypad-${this.pad}.png`;
  }
}
