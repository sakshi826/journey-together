// @ts-nocheck
export interface ThoughtItem {
  id: string;
  text: string;
  bucket?: "action" | "later" | "letgo";
}
