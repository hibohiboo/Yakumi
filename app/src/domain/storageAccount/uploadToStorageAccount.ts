import {
  BlockBlobClient,
  BlockBlobParallelUploadOptions,
} from '@azure/storage-blob';
import { postSASToken } from '../api/crud';
import { convertFileToArrayBuffer } from './convert-file-to-arraybuffer';

const containerName = `$web`;
const permission = 'w'; //write
const timerange = 5; //minutes
const minFileSize = 1; //bytes
const maxFileSize = 5 * 1024 * 1024; // 5M bytes
/**
 * Uploads a file to a storage account web container
 * @param file - The file to upload
 * @param fileName - The name of the file
 * @param directory - The directory to upload the file to
 */
export const uploadToStorageAccount = async (
  file: File,
  fileName: string,
  directory = 'uploaded',
  option?: BlockBlobParallelUploadOptions,
) => {
  const filePath = `${directory}/${fileName}`;
  const sasToken = await getSasTokenUrl(filePath);
  if (!sasToken) {
    console.warn('Failed to get sas token');
    return false;
  }
  try {
    const fileArrayBuffer = await convertFileToArrayBuffer(file as File);

    if (
      fileArrayBuffer === null ||
      fileArrayBuffer.byteLength < minFileSize ||
      fileArrayBuffer.byteLength > maxFileSize
    ) {
      console.warn('Failed to convert file to array buffer');
      return;
    }

    const blockBlobClient = new BlockBlobClient(sasToken);

    await blockBlobClient.uploadData(fileArrayBuffer, option);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      const { message, stack } = error;

      console.warn(
        `Failed to finish upload with error : ${message} ${stack || ''}`,
      );
    } else {
      console.warn(error as string);
    }
    return false;
  }
};

async function getSasTokenUrl(filePath: string) {
  try {
    const response = await postSASToken(
      filePath,
      permission,
      containerName,
      timerange,
    );
    const data = await response.json();
    const { url } = data;
    return url;
  } catch (error) {
    console.warn(error);
    if (error instanceof Error) {
      const { message, stack } = error;
      console.warn(`Error getting sas token: ${message} ${stack || ''}`);
    } else {
      console.warn(error as string);
    }
  }
}
