import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { CSSType } from "@nativescript/core";
import { View } from "@triniwiz/nativescript-masonkit";
import { registerElement } from "@nativescript/angular";

registerElement("app-frog", () => FrogComponent);

@CSSType("app-frog")
@Component({
  selector: "app-frog",
  template: ` <Image [src]="src" class="frog" /> `,
  styles: [
    `
      .frog {
        width: 50;
        height: 50;
      }
    `,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FrogComponent extends View {
  @Input() frog: "g" | "y" | "r" = "g";
  get src() {
    return `~/assets/frog-${this.frog}.png`;
  }
}
