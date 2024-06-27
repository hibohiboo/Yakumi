// connect-with-default-azure-credential.js
import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';

export const getBlobClient = () => {
  const accountName = process.env.Azure_Storage_AccountName;
  if (!accountName) throw Error('Azure Storage accountName not found');

  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential(),
  );
  return blobServiceClient;
};
