export interface BlobTriggerMetadata {
  blobTrigger: string;
  uri: string;
  properties: BlobProperties;
}

interface BlobProperties {
  lastModified: string;
  createdOn: string;
  metadata: Record<string, any>;
  objectReplicationDestinationPolicyId: string | null;
  objectReplicationSourceProperties: string | null;
  blobType: number;
  copyCompletedOn: string;
  copyStatusDescription: string | null;
  copyId: string | null;
  copyProgress: string | null;
  copySource: string | null;
  copyStatus: number;
  blobCopyStatus: string | null;
  isIncrementalCopy: boolean;
  destinationSnapshot: string | null;
  leaseDuration: number;
  leaseState: number;
  leaseStatus: number;
  contentLength: number;
  contentType: string;
  eTag: Record<string, any>;
  contentHash: string;
  contentEncoding: string | null;
  contentDisposition: string | null;
  contentLanguage: string | null;
  cacheControl: string | null;
  blobSequenceNumber: number;
  acceptRanges: string;
  blobCommittedBlockCount: number;
  isServerEncrypted: boolean;
  encryptionKeySha256: string | null;
  encryptionScope: string | null;
  accessTier: string;
  accessTierInferred: boolean;
  archiveStatus: string | null;
  accessTierChangedOn: string;
  versionId: string | null;
  isLatestVersion: boolean;
  tagCount: number;
  expiresOn: string;
  isSealed: boolean;
  rehydratePriority: string | null;
  lastAccessed: string;
  immutabilityPolicy: ImmutabilityPolicy;
  hasLegalHold: boolean;
}

interface ImmutabilityPolicy {
  expiresOn: string | null;
  policyMode: string | null;
}
