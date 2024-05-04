// eslint-disable-next-line turbo/no-undeclared-env-vars
const baseUrl = `${import.meta.env.VITE_API_SERVER ?? ''}/api`;
const apiBaseUrl = '/data-api/rest'; // 'https://gentle-smoke-0024c9c00.5.azurestaticapps.net/data-api/rest';
export const postSASToken = async (
  filePath: string,
  permission: string,
  containerName: string,
  timerange: number,
) => {
  const requestUrl = `${baseUrl}/credentials?file=${encodeURIComponent(
    filePath,
  )}&permission=${permission}&container=${containerName}&timerange=${timerange}`;
  const response = await fetch(requestUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

type UUID = string;
type Json = string;
export const putCharacter = async (args: {
  id: UUID;
  uid: UUID;
  data: Json;
}) => {
  const requestUrl = `${baseUrl}/rank-character/${args.id}`;
  const response = await fetch(requestUrl, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  return response;
};

// Static Web API SQL Server (Preview)
export const getCharacter = async (id: UUID) => {
  const requestUrl = `${apiBaseUrl}/YakumiCharacter/id/${id}?$select=data`;
  const response = await fetch(requestUrl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = (await response.json()) as { value: unknown[] };
  const [item] = body.value as { data: Json }[];
  if (!item || !item.data) {
    throw new Error('Character not found');
  }
  return JSON.parse(item.data);
};
