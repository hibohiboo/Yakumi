import { getStorageAccountFilePath } from '@yakumi-app/domain/storageAccount/getFilePath';
import { Params } from 'react-router-dom';
import { storageAccountPrefix } from '../constants';

export const characterLoader = async ({
  params,
}: {
  params: Params<string>;
}) => {
  if (!params.id) throw new Response('Not Found', { status: 404 });
  const zipUrl = getStorageAccountFilePath(
    `${storageAccountPrefix}/${params.uid}/${params.id}/udonarium-character.zip`,
  );
  const res = await fetch(
    getStorageAccountFilePath(
      `${storageAccountPrefix}/${params.uid}/${params.id}/character-data.json`,
    ),
  );
  const data = await res.json();
  return {
    data,
    zipUrl,
  };
};
