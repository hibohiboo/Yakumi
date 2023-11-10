import { format } from 'date-fns';
import { FileArchiver, createDoc } from './fileArchiver';
const DATETIME_FILE_FORMAT = 'yyyyMMdd_HHmmss';

export const createZip = async (files: File[]) => {
  FileArchiver.instance.save(files, format(new Date(), DATETIME_FILE_FORMAT));
};

export const getDoc = () => createDoc();
