import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import { connectionString } from '@yakumi-api/lib/constants';
import Database from '@yakumi-api/lib/database';
import * as sql from 'mssql';

const db = new Database(connectionString);
export async function getCharacterCards(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.params.id}"`);
  if (!request.params.id) {
    return {
      status: 400,
      body: JSON.stringify({ message: 'Missing character id' }),
    };
  }
  const ret = await db.readAll<{
    Id: string;
    CharacterName: string;
    CardName: string;
  }>({
    query: `
    WITH CharacterData (Id, CharacterName, Cards) AS (
        select id AS Id
             , JSON_VALUE(data, '$.name') AS CharacterName
             , JSON_QUERY(data, '$.cards') as Cards 
        from YakumiCharacter
        where id = @id
      )
      SELECT Id, CharacterName, CardName
      FROM CharacterData
           CROSS APPLY OPENJSON (Cards) WITH (CardName NVARCHAR(100) '$.name');
    `,
    params: [{ name: 'id', data: request.params.id, type: sql.NVarChar }],
    logger: (args) => context.log(args),
  });

  return { body: JSON.stringify(ret) };
}

app.http('getCharacterCards', {
  route: 'get-character-cards/{id}',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: getCharacterCards,
});
