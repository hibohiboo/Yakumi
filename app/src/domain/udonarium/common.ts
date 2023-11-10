import { format } from 'date-fns';
import { FileArchiver, createDoc } from './fileArchiver';
const DATETIME_FILE_FORMAT = 'yyyyMMddHHmmss';

export const createZip = async (files: File[], name: string) => {
  FileArchiver.instance.save(
    files,
    `${name}_${format(new Date(), DATETIME_FILE_FORMAT)}`,
  );
};

export const getDoc = () => createDoc();
