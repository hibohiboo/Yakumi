// interface ChatMessageContext {
//   identifier?: string;
//   tabIdentifier?: string;
//   originFrom?: string;
//   from?: string;
//   to?: string;
//   name?: string;
//   text?: string;
//   timestamp?: number;
//   tag?: string; // game type
//   dicebot?: string;
//   imageIdentifier?: string;

//   imagePos?: number;
//   messColor?: string;
//   sendFrom?: string; // lily
// }

// interface PostMessageData<T> {
//   payload: T;
//   type: 'chat' | 'dice';
// }
// type PostMessageChat = PostMessageData<{
//   message: ChatMessageContext;
//   tab: string;
// }>;
export type PostMessageEventType =
  | 'change-player-name'
  | 'connect-by-target-user-id'
  | 'connect-by-room-alias'
  | 'send-chat-message';
export interface Message {
  type: PostMessageEventType;
  payload: unknown;
}

export interface ChatMessagePayload {
  aliasName: 'chat';
  identifier: string;
  majorVersion: number;
  minorVersion: number;
  syncData: {
    value: string; // チャット内容
    parentIdentifier: string; // タブのidentifier ... 例: MainTab
    majorIndex: number;
    minorIndex: number;
    attributes: {
      fixd: boolean;
      from: string; // userId
      imageIdentifier: string;
      messColor: string; // #ffffff
      name: string;
      sendFrom: string;
      tag: string; // ex. DiceBot
      timestamp: number;
    };
  };
}
export interface ChatMessage {
  id: string; // context.identifier
  text: string; // syncData.value
  from: string; // syncData.attributes.from
  name: string; // syncData.attributes.name
  timestamp: number; // syncData.attributes.timestamp
}

// RoomData

enum PeerSessionGrade {
  UNSPECIFIED,
  LOW,
  MIDDLE,
  HIGH,
}
interface PeerSessionState {
  /**
   * 接続方法の評価. `PeerSessionGrade.LOW`よりも`PeerSessionGrade.HIGH`の方がより望ましい方法で通信している事を示す.
   */
  readonly grade: PeerSessionGrade;
  /**
   * データ送信に対する宛先からの応答時間(Round-Trip Time). 単位はms.
   */
  readonly ping: number;
  /**
   * 接続の健康度を`[0.0, 1.0]`の区間で表現した値. 値が1.0より低い場合、通信が切断している可能性がある.
   */
  readonly health: number;
  /**
   * 通信速度の評価を`[0.0, 1.0]`の区間で表現した値. 値が高いほど通信速度が速い.
   */
  readonly speed: number;
  /**
   * 接続についての任意の説明.
   */
  readonly description: string;
}
interface IPeerContext {
  readonly peerId: string;
  readonly userId: string;
  readonly roomId: string;
  readonly roomName: string;
  readonly password: string;
  readonly digestUserId: string;
  readonly digestPassword: string;
  readonly isOpen: boolean;
  readonly isRoom: boolean;
  readonly hasPassword: boolean;
  readonly session: PeerSessionState;
}
export interface PeerRoom {
  alias: string;
  roomName: string;
  peerContexts: IPeerContext[];
}
export interface Room {
  alias: string; // `${roomId}${roomName}`
  name: string;
  hasPassword: boolean;
  numberOfEntrants: number;
}

export interface IRoomInfo {
  readonly id: string;
  readonly name: string;
  readonly hasPassword: boolean;
  readonly peers: IPeerContext[];
}
