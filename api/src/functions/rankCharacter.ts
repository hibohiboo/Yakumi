import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  output,
} from '@azure/functions';
import type { YakumiCharacter } from '@yakumi-prisma/types';

const sqlOutput = output.sql({
  commandText: '[dbo].[YakumiCharacter]',
  connectionStringSetting: 'DATABASE_CONNECTION_STRING',
});

export async function rankCharacter(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const characterId = request.params.characterId;
  const { uid, data } = (await request.json()) as Pick<
    YakumiCharacter,
    'uid' | 'data'
  >;
  const ret = context.extraOutputs.set(sqlOutput, {
    id: characterId,
    uid,
    data,
    updated: new Date(),
  });
  context.log(`ret: ${ret}`);
  return {
    status: 200,
  };
}

app.http('rankCharacter', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'rank-character/{characterId}',
  extraOutputs: [sqlOutput],
  handler: rankCharacter,
});
