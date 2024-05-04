import { ExtraTag } from '../types';

export const convertExtraTagsFromSpreadsheet = (
  data: string[][] | undefined,
): ExtraTag[] => {
  if (!data) return [];
  const extraTags = data.map(([id, type, value, effect, icon]) => ({
    id,
    type,
    value,
    effect,
    icon,
  }));
  return extraTags;
};
