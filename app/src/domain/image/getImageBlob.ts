import { DEFAULT_CHAR_IMG } from '../fallMagia/constants';
import { getImageSrc } from './getImageSrc';

export const getImageBlob = async (image: File | undefined, src: string) => {
  if (image && image.size > 0) {
    return image;
  }

  const defaultImageFileDataUrl = src ? src : getImageSrc(DEFAULT_CHAR_IMG);
  const res = await fetch(defaultImageFileDataUrl, { mode: 'cors' });
  const blob = await res.blob();
  return blob;
};
