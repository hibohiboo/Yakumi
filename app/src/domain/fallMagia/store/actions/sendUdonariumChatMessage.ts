import { createAsyncThunk } from '@reduxjs/toolkit';
import { postUdonariumMessage } from '../../services/udonarium/post';

export const sendUdonariumChatMessage = createAsyncThunk<
  Promise<void>,
  { text: string; userId: string; playerName: string }
>('sendUdonariumChatMessage', async (req) => {
  const { text, userId, playerName } = req;
  if (text === '') {
    return;
  }
  const chatMessage = {
    from: userId,
    name: playerName,
    timestamp: Date.now(),
    text,
  };

  postUdonariumMessage(chatMessage, 'send-chat-message');
});
