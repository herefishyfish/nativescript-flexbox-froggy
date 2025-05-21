import { View, Text } from "@triniwiz/nativescript-masonkit";
import {
  Article,
  Aside,
  B,
  Blockquote,
  Code,
  Div,
  Footer,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Header,
  Li,
  Main,
  Nav,
  P,
  Section,
  Span,
  Ul,
} from "@triniwiz/nativescript-masonkit/web";
import { Img } from "@triniwiz/nativescript-masonkit";
import { registerElement } from "@nativescript/angular";

registerElement("Img", () => Img);
registerElement("img", () => Img);
registerElement("View", () => View);
registerElement("Text", () => Text);
registerElement("article", () => Article);

registerElement("aside", () => Aside);
registerElement("b", () => B);
registerElement("blockquote", () => Blockquote);
registerElement("div", () => Div);
registerElement("section", () => Section);
registerElement("header", () => Header);
registerElement("footer", () => Footer);
registerElement("main", () => Main);
registerElement("nav", () => Nav);
registerElement("span", () => Span);
registerElement("code", () => Code);
registerElement("h1", () => H1);
registerElement("h2", () => H2);
registerElement("h3", () => H3);
registerElement("h4", () => H4);
registerElement("h5", () => H5);
registerElement("h6", () => H6);
registerElement("p", () => P);
registerElement("ul", () => Ul);
registerElement("li", () => Li);
