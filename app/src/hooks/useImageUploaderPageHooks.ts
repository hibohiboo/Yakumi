import { uploadToStorageAccount } from '@yakumi-app/domain/storageAccount/uploadToStorageAccount';
import { extraDownload } from '@yakumi-app/domain/vsRankCharacter/extraTags/extraDownload';
import { ChangeEvent, useState } from 'react';

export const useImageUploaderPageHooks = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    if (!(target instanceof HTMLInputElement)) return;
    if (
      target?.files === null ||
      target?.files?.length === 0 ||
      target?.files[0] === null
    )
      return;

    setSelectedFile(target?.files[0]);
  };

  const handleIconFileUpload = async () => {
    setUploadStatus('connecting to server...');
    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }
    const result = await uploadToStorageAccount(
      selectedFile,
      selectedFile.name,
      'icons',
    );
    if (result) {
      setUploadStatus('Successfully finished upload');
      return;
    }

    setUploadStatus('upload failed');
  };

  return {
    handleFileSelection,
    handleFileUpload: handleIconFileUpload,
    uploadStatus,
    extraDownload,
  };
};
