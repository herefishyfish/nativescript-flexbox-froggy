export interface Level {
  name: string;
  instructions: { [lang: string]: string };
  board: string;
  style: { [prop: string]: string; };
  before: string;
  after: string;
  selector?: string;
  classes?: { [sel: string]: string };
}