import { ExtraTag } from '../types';
import { createToken } from './extraDownload';

export const createUdonariumTokens = async (tags: ExtraTag[]) => {
  const list = await Promise.all(
    tags.map(async (item) => {
      if (!item) return [];
      return createToken(item);
    }),
  );
  return list.flat();
};
