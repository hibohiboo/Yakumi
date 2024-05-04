import { UUID } from '@yakumi-app/domain/udonarium/uuid';

export const createCharacterId = (): string => {
  const uid = UUID.generateUuid();
  return uid;
};
