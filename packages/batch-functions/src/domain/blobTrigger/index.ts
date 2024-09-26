import { BlobTriggerMetadata } from './types';

export const isBlobTriggerMetadata = (a: any): a is BlobTriggerMetadata => {
  return typeof a?.blobTrigger === 'string';
};
