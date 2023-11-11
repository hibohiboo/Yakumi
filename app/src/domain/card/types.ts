export interface TextCard {
  name: string;
  content: string;
  id: string;
  type: string;
}
export interface Settings {
  deckName: string;
  state: '0' | '1';
  size: string;
  description: string;
}
export interface ImageCard {
  name: string;
  back: string;
  front: string;
  description: string;
}
export type ImageCardWithFile = ImageCard & {
  backFile: File;
  frontFile: File;
  backUrl: string;
  frontUrl: string;
};
