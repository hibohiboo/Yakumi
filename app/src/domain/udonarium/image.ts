import { getImageBlob } from '../image/getImageBlob';
import { calcSHA256Async } from './FileReaderUtil';
import { MimeType } from './mimeType';

export const imageSrcToFile = async (src: string) => {
  const blob = await getImageBlob(undefined, src);

  const identifier = await calcSHA256Async(blob);
  return {
    file: new File([blob], identifier + '.' + MimeType.extension(blob.type), {
      type: blob.type,
    }),
    identifier,
  };
};
