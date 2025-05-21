import {
  Directive,
  effect,
  inject,
  input,
  ViewContainerRef,
} from "@angular/core";
import { Div, Span, H1, H2, H3, H4, H5, H6, Li, P, Ul } from "@triniwiz/nativescript-masonkit/web";
import { Text, View } from "@triniwiz/nativescript-masonkit";
import { Image } from "@nativescript/core";

const classMap = {
  p: P,
  div: Div,
  span: Span,
  code: View,
  ul: Ul,
  li: Li,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: Image,
};

interface ParsedNode {
  tagName: string;
  content: string;
  children: ParsedNode[];
}

@Directive({
  selector: "[innerView]",
})
export class InnerViewDirective {
  private parentView = inject(ViewContainerRef);
  innerView = input<string>("");

  constructor() {
    effect(() => {
      const parent = this.parentView.element.nativeElement as View;
      const viewString = this.innerView();

      parent.removeChildren();
      if (this.innerView()) {
        const componentTree = this.createInnerView();

        if (componentTree) {
          parent.addChild(componentTree);
        }
      }
    });
  }

  parseInnerView(): ParsedNode[] {
    const viewString = this.innerView();
    return this.parseNodes(viewString);
  }

  private parseNodes(str: string, isInTag = false): ParsedNode[] {
    const voidTags = new Set(["img","br","hr","input"]);
    const nodes: ParsedNode[] = [];
    let pos = 0;
  
    while (pos < str.length) {
      const nextOpen = str.indexOf("<", pos);
      if (nextOpen === -1) {
        const text = str.substring(pos).trim();
        if (text) nodes.push({ tagName: "text", content: text, children: [] });
        break;
      }
  
      if (nextOpen > pos) {
        const text = str.substring(pos, nextOpen).trim();
        if (text) nodes.push({ tagName: "text", content: text, children: [] });
      }
  
      const nextClose = str.indexOf(">", nextOpen);
      if (nextClose === -1) break;
  
      const rawTag = str.substring(nextOpen + 1, nextClose).trim();
      const [tagNameRaw, ...attrParts] = rawTag.replace(/\/$/, "").split(/\s+/);
      const tagName = tagNameRaw.toLowerCase();
  
      if (voidTags.has(tagName) || rawTag.endsWith("/")) {
        let content = "";
        if (tagName === "img") {
          const match = rawTag.match(/src=["']([^"']+)["']/);
          content = match?.[1] ?? "";
        }
        nodes.push({ tagName, content, children: [] });
        pos = nextClose + 1;
        continue;
      }
  
      const closingTag = `</${tagName}>`;
      const closingIdx = str.indexOf(closingTag, nextClose);
      if (closingIdx === -1) break;
  
      const inner = str.substring(nextClose + 1, closingIdx);
      const childNodes = this.parseNodes(inner, true);

      let textContent = "";
      const elementChildren: ParsedNode[] = [];
      for (const c of childNodes) {
        if (c.tagName === "text") textContent += c.content;
        else elementChildren.push(c);
      }
  
      nodes.push({
        tagName,
        content: textContent,
        children: elementChildren,
      });
  
      pos = closingIdx + closingTag.length;
    }
  
    return nodes;
  }

  private buildComponent(node: ParsedNode): View | Text | null {
    if (node.tagName === "text") {
      const t = new Text();
      t.text = node.content;
      return t;
    }
  
    const ComponentClass = classMap[node.tagName];
    if (!ComponentClass) {
      console.error(`No component for <${node.tagName}>`);
      return null;
    }
  
    const comp = new ComponentClass();
  
    if (node.tagName === "img" && comp instanceof Image) {
      (comp as Image).src = node.content;
      return comp as any;
    }
  
    if (node.content) {
      const t = new Text();
      t.text = node.content;
      (comp as View).addChild(t);
    }
  
    for (const child of node.children) {
      const childComp = this.buildComponent(child);
      if (childComp) (comp as View).addChild(childComp);
    }
  
    return comp;
  }
  
  createInnerView(): View | null {
    const parsedNodes = this.parseInnerView();
    console.log("Parsed nodes:", parsedNodes);
    if (!parsedNodes || parsedNodes.length === 0) return null;

    const rootContainer = new View();
    parsedNodes.forEach((node) => {
      const component = this.buildComponent(node);
      if (component) {
        rootContainer.addChild(component);
      }
    });
    return rootContainer;
  }
}
