import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import { getBlobClient } from '@yakumi-api/lib/azure-storage-with-credential';

export async function magiaCharacter(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const { uid, id } = request.params;
  context.log(`uid: ${uid}, id: ${id}`);
  const bloblClient = getBlobClient();
  const container = bloblClient.getContainerClient('$web');
  const blob = container.getBlobClient(
    `fall-magia/character-data/${uid}/${id}/character-data.json`,
  );
  const res = await blob.download();
  if (res.errorCode || !res.readableStreamBody) {
    throw new Error('Blob not found');
  }
  const data = JSON.parse(
    (await streamToBuffer(res.readableStreamBody)).toString(),
  );
  return {
    status: 200,
    headers: new Headers([['Content-Type', 'application/json']]),
    body: JSON.stringify(data),
  };
}

app.http('magiaCharacter', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'magia-character/{uid}/{id}',
  handler: magiaCharacter,
});

function streamToBuffer(
  readableStreamBody: NodeJS.ReadableStream,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStreamBody.on('data', (chunk) => {
      const content = chunk instanceof Buffer ? chunk : Buffer.from(chunk);
      chunks.push(content);
    });
    readableStreamBody.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    });
    readableStreamBody.on('error', reject);
  });
}
