export function getSrc(characterSrc?: string, characterSavedSrc?: string) {
  if (characterSrc?.includes('blob')) {
    return characterSrc;
  }
  if (characterSavedSrc) {
    return characterSavedSrc;
  }
  return characterSrc || '';
}
