import { dataServerDomain } from '@yakumi-app/constants';

export const getStorageAccountFilePath = (fileName: string) =>
  `${dataServerDomain}/${fileName}`;
