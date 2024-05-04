import { UUID } from '@yakumi-app/domain/udonarium/uuid';
const USER_ID_KEY = 'userId';
export const getOrCreateUserId = (): string => {
  const localUid = localStorage.getItem(USER_ID_KEY);
  if (localUid) {
    return localUid;
  }
  const uid = UUID.generateUuid();
  localStorage.setItem(USER_ID_KEY, uid);
  return uid;
};
