import { app, InvocationContext } from '@azure/functions';

export async function eventGridBlobTrigger1(
  blob: unknown, // Buffer,
  context: InvocationContext,
): Promise<void> {
  context.log(
    `Storage blob function processed blob "${context.triggerMetadata?.name}" with size ${(blob as Buffer).length} bytes`,
  );
}

app.storageBlob('eventGridBlobTrigger1', {
  path: 'samples-workitems/batch-functions',
  source: 'EventGrid',
  connection: '0d5e76_STORAGE',
  handler: eventGridBlobTrigger1,
});
