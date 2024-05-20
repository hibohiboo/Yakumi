import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  app,
} from '@azure/functions';
import { generateSASUrl } from '@yakumi-api/lib/azure-storage.js';

export async function getGenerateSasToken(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    if (
      !process.env?.Azure_Storage_AccountName ||
      !process.env?.Azure_Storage_AccountKey
    ) {
      return {
        status: 405,
        jsonBody: 'Missing required app configuration',
      };
    }
    const { containerName, fileName, permissions } = getQueryParameters(
      request,
      context,
    );

    const url = await generateSASUrl(
      process.env?.Azure_Storage_AccountName,
      process.env?.Azure_Storage_AccountKey,
      containerName,
      fileName,
      permissions,
    );

    return {
      jsonBody: {
        url,
      },
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: error,
    };
  }
}

app.http('credentials', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: getGenerateSasToken,
});

function getQueryParameters(request: HttpRequest, context: InvocationContext) {
  const containerName = request.query.get('container') || 'images';
  const fileName = request.query.get('file') || 'nonamefile';
  const permissions = request.query.get('permission') || 'w';
  const timerange = parseInt(request.query.get('timerange') || '10'); // 10 minutes

  context.log(`containerName: ${containerName}`);
  context.log(`fileName: ${fileName}`);
  context.log(`permissions: ${permissions}`);
  context.log(`timerange: ${timerange}`);
  return {
    containerName,
    fileName,
    permissions,
    timerange,
  };
}
