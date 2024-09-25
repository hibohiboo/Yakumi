import { app, InvocationContext } from '@azure/functions';

export async function BlobTriggerEventGrid(
  blob: unknown, // Buffer,
  context: InvocationContext,
): Promise<void> {
  context.log(
    `Storage blob function processed blob "${context.triggerMetadata?.name}" with size ${(blob as Buffer).length} bytes`,
  );
}

app.storageBlob('BlobTriggerEventGrid', {
  path: '$web',
  source: 'EventGrid',
  connection: 'TARGET_STORAGE_ACCOUNT',
  handler: BlobTriggerEventGrid,
});
