import {View, Text} from '@triniwiz/nativescript-masonkit';
import { registerElement } from '@nativescript/angular';
import { CSSType } from '@nativescript/core';

registerElement('View', () => View);
registerElement('Text', () => Text);

@CSSType('div')
export class Div extends View {}
registerElement('div', () => Div);

@CSSType('section')
export class Section extends View {}
registerElement('section', () => Section);

@CSSType('header')
export class Header extends View {}
registerElement('header', () => Header);

@CSSType('footer')
export class Footer extends View {}
registerElement('footer', () => Footer);

@CSSType('article')
export class Article extends View {}
registerElement('article', () => Article);

@CSSType('main')
export class Main extends View {}
registerElement('main', () => Main);

@CSSType('nav')
export class Nav extends View {}
registerElement('nav', () => Nav);

@CSSType('aside')
export class Aside extends View {}
registerElement('aside', () => Aside);

@CSSType('span')
export class Span extends Text {}
registerElement('span', () => Span);

@CSSType('code')
export class Code extends Text {}
registerElement('code', () => Code);

@CSSType('h1')
export class H1 extends Text {}
registerElement('h1', () => H1);

@CSSType('h2')
export class H2 extends Text {}
registerElement('h2', () => H2);

@CSSType('h3')
export class H3 extends Text {}
registerElement('h3', () => H3);

@CSSType('h4')
export class H4 extends Text {}
registerElement('h4', () => H4);

@CSSType('h5')
export class H5 extends Text {}
registerElement('h5', () => H5);

@CSSType('h6')
export class H6 extends Text {}
registerElement('h6', () => H6);

@CSSType('p')
export class P extends Text {}
registerElement('p', () => P);

@CSSType('ul')
export class Ul extends View {}
registerElement('ul', () => Ul);

@CSSType('li')
export class Li extends Text {}
registerElement('li', () => Li);