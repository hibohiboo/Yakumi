import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import { format } from 'date-fns';

export async function httpTrigger1(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get('name') || (await request.text()) || 'world';
  const time = format(new Date(), 'yyyy-MM-dd: HH:mm:ss');
  return {
    body: JSON.stringify({
      msg: `Hello, ${name}!`,
      time,
      headers: JSON.stringify([...request.headers.entries()]),
      url: JSON.stringify(request.url),
      method: request.method,
      Authorization: request.headers.get('Authorization'),
      authorization: request.headers.get('authorization'),
      query: JSON.stringify([...request.query.entries()]),
      context: JSON.stringify(context),
    }),
  };
}

app.http('httpTrigger1', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: httpTrigger1,
});
