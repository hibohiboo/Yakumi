import { app, InvocationContext, output } from '@azure/functions';
import { isBlobTriggerMetadata } from '../domain/blobTrigger';

const sqlOutput = output.sql({
  commandText: '[dbo].[YakumiCharacter]',
  connectionStringSetting: 'DATABASE_CONNECTION_STRING',
});

export async function BlobTriggerEventGrid(
  blob: unknown, // Buffer,
  context: InvocationContext,
): Promise<void> {
  console.log('context'.endsWith('json'), JSON.stringify(context));
  if (!isBlobTriggerMetadata(context.triggerMetadata)) {
    context.warn('context.triggerMetadata is not BlobTriggerMetadata');
    return;
  }
  // zipファイルは処理しない
  if (!context.triggerMetadata.blobTrigger.endsWith('json')) return;
  if (!Buffer.isBuffer(blob)) return;
  const blobContent = blob.toString('utf-8');
  const data = JSON.parse(blobContent);
  const { uid, characterId } = data;
  if (!uid || !characterId) {
    context.log('obj is not Character', data);
    return;
  }
  context.extraOutputs.set(sqlOutput, {
    id: characterId,
    uid,
    data: blobContent,
    updated: new Date(),
  });
}

app.storageBlob('BlobTriggerEventGrid', {
  path: 'web',
  source: 'EventGrid',
  connection: 'TARGET_STORAGE_ACCOUNT',
  handler: BlobTriggerEventGrid,
  extraOutputs: [sqlOutput],
});
