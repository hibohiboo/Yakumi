import { app, InvocationContext } from '@azure/functions';

export async function BlobTriggerEventGrid(
  blob: unknown, // Buffer,
  context: InvocationContext,
): Promise<void> {
  console.log('context', JSON.stringify(context));
  if (!Buffer.isBuffer(blob)) {
    context.warn('blob is not buffer');
    return;
  }
  context.log(
    `Storage blob function processed blob "${context.triggerMetadata?.name}" with size ${blob.length} bytes`,
  );
  const blobContent = blob.toString('utf-8');
  const obj = JSON.parse(blobContent);
  context.log('obj', obj);
}

app.storageBlob('BlobTriggerEventGrid', {
  path: 'web',
  source: 'EventGrid',
  connection: 'TARGET_STORAGE_ACCOUNT',
  handler: BlobTriggerEventGrid,
});
