import { UDONARIUM_IFRAME_ID, udonariumOrigin } from './const';
import { Message, PostMessageEventType } from './types';

export const postUdonariumMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  type: PostMessageEventType,
) => {
  const target = document.getElementById(
    UDONARIUM_IFRAME_ID,
  ) as HTMLIFrameElement;
  if (!target || !target.contentWindow) return;
  const message: Message = {
    type,
    payload,
  };
  target.contentWindow.postMessage(message, udonariumOrigin);
};
