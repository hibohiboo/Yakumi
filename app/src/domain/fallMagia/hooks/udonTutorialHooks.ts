import { useAppDispatch } from '@yakumi-app/store/hooks';
import { useState } from 'react';
import { sendUdonariumChatMessage } from '../store/actions/sendUdonariumChatMessage';

function* tutorilalGeneratorLocal() {
  yield {
    msg: `まずはキャラクターを読み込もう。zipファイルをドラッグ&ドロップするか、コマンドで行うよ`,
    cmd: '/load http://localhost:4200/assets/data/test_magia.zip',
  };

  yield {
    msg: `キャラクターは初期配置エリアの任意のマスに置こう`,
    cmd: '/move_character ココルティア,350,450',
  };
  yield {
    msg: 'カードデッキを順番に配置していくよ。ちょっと遠くから見てみよう。',
    cmd: '/view_transform 0,0,-1200,0,0,0',
  };
  yield {
    msg: '常時のカードは盤面の横に置いておこう',
    cmd: '/move_cardstack ココルティアデッキ (常時タイミング),-160,540',
  };
  yield {
    msg: 'デッキを右クリックして「カード一覧」を選ぶとデッキ内のカードを確認できるよ。スマホの場合は右クリックを「タップ長押し」と読み替えてね',
    cmd: '',
  };
  yield {
    msg: '戦闘外のカードはプレイでは使わない。さらに外れに置いておこう',
    cmd: '/move_cardstack ココルティアデッキ (戦闘外),-350,540',
  };
  yield {
    msg: 'デッキを右クリックして「山札を削除する」を選ぶとデッキを削除できる。邪魔なら消していい',
    cmd: '',
  };
  yield {
    msg: '次は手札置き場を作る。右クリックで「ボードの作成」かコマンドで作成できる',
    cmd: '/create_hand_storage 手札置き場,0,800,20,5',
  };
  yield {
    msg: '手札のデッキを手札置き場に乗せよう',
    cmd: '/move_cardstack ココルティアデッキ,100,800',
  };
  yield {
    msg: 'デッキを右クリックして「山札を崩す」を選ぶとばらばらのカードにできる',
    cmd: '/break_stack ココルティアデッキ',
  };

  yield {
    msg: '手札置き場を右クリックして「ボード上のカードを整列」を選ぶとカードを並べられる',
    cmd: '/board_alignment 手札置き場',
  };
  yield {
    msg: `手番の説明をするよ。左上に赤と青のカウンタがあるね。上にあるほうが先に手番を行うよ`,
    cmd: '',
  };

  yield {
    msg: `手番のカードを使ってみよう。`,
    cmd: '/move_card 一般射撃魔法《シュート》,700,450',
  };
  yield {
    msg: `カードに書かれた「カウント」だけ自分のカウンタを増やすよ`,
    cmd: '/param_terrain 先行,カウント,5',
  };
  yield {
    msg: `先行の青カウンタを進めよう`,
    cmd: '/move_terrain 先行,260,50',
  };
  yield {
    msg: `効果の解決が終わったら、使ったカードは捨て札となるよ。`,
    cmd: '/move_card 一般射撃魔法《シュート》,1050,450',
  };
  yield {
    msg: `捨て札は手札に回収することで再び使用できるようになるよ`,
    cmd: '/param_terrain 後攻,カウント,10',
  };

  yield {
    msg: `対戦相手も同じように手番を行ったらカウンタを動かすよ`,
    cmd: '/move_terrain 後攻,460,20',
  };
  yield {
    msg: `黄色いパネルを現在カウントと呼ぶよ。全員の手番がおわったら1マス進めるよ`,
    cmd: '/move_terrain 現在カウント,50,0',
  };
  yield {
    msg: `現在カウントがカウンタの下に来たら、手番になるよ`,
    cmd: '/move_terrain 現在カウント,250,0',
  };
  yield {
    msg: `右クリックで「カウンターボードを開く」を選ぶとカウンタの数値を簡単に変えられるよ`,
    cmd: '/open_counter_board',
  };
  yield {
    msg: `「カウンターボード」と「現在カウント」の２つのタブがあるから切り替えて使ってね`,
    cmd: '',
  };
  yield {
    msg: `チュートリアルは以上だよ。ここまで付き合ってくれてありがとう。`,
    cmd: '',
  };
  yield {
    msg: `Udonariumのロックを解除するよ。次へボタンを押してね`,
    cmd: '',
  };
}
function* tutorilalGenerator() {
  yield {
    msg: `チュートリアルの間はUdonariumをロックさせてもらうね`,
    cmd: '',
  };
  yield {
    msg: `まずはキャラクターを読み込もう。zipファイルをドラッグ&ドロップするか、コマンドで行うよ`,
    cmd: '/load https://yakumi.azureedge.net/fall-magia/character-data/36116755-f543-4f08-8c98-cb03dee9e524/e329ef28-86e2-41e3-a2f9-5b29ac683f42/udonarium-character.zip',
  };

  yield {
    msg: `キャラクターは初期配置エリアの任意のマスに置こう`,
    cmd: '/move_character ユキスミレ,350,450',
  };
  yield {
    msg: 'カードデッキを順番に配置していくよ。ちょっと遠くから見てみよう。',
    cmd: '/view_transform 0,0,-1200,0,0,0',
  };
  yield {
    msg: '常時のカードは盤面の横に置いておこう',
    cmd: '/move_cardstack ユキスミレデッキ (常時タイミング),-160,540',
  };
  yield {
    msg: 'デッキを右クリックして「カード一覧」を選ぶとデッキ内のカードを確認できるよ',
    cmd: '',
  };
  yield {
    msg: '戦闘外のカードはプレイでは使わない。さらに外れに置いておこう',
    cmd: '/move_cardstack ユキスミレデッキ (戦闘外),-350,540',
  };
  yield {
    msg: 'デッキを右クリックして「山札を削除する」を選ぶとデッキを削除できる。邪魔なら消していい',
    cmd: '',
  };
  yield {
    msg: '次は手札置き場を作る。右クリックで「ボードの作成」かコマンドで作成できる',
    cmd: '/create_hand_storage 手札置き場,0,800,20,5',
  };
  yield {
    msg: '手札のデッキを手札置き場に乗せよう',
    cmd: '/move_cardstack ユキスミレデッキ,100,800',
  };
  yield {
    msg: 'デッキを右クリックして「山札を崩す」を選ぶとばらばらのカードにできる',
    cmd: '/break_stack ユキスミレデッキ',
  };

  yield {
    msg: '手札置き場を右クリックして「ボード上のカードを整列」を選ぶとカードを並べられる',
    cmd: '/board_alignment 手札置き場',
  };
  yield {
    msg: `手番の説明をするよ。左上に赤と青のカウンタがあるね。上にあるほうが先に手番を行うよ`,
    cmd: '',
  };

  yield {
    msg: `手番のカードを使ってみよう。`,
    cmd: '/move_card 一般射撃魔法《シュート》,700,450',
  };
  yield {
    msg: `カードに書かれた「カウント」だけ自分のカウンタを増やすよ`,
    cmd: '/param_terrain 先行,カウント,5',
  };
  yield {
    msg: `先行の青カウンタを進めよう`,
    cmd: '/move_terrain 先行,260,50',
  };
  yield {
    msg: `効果の解決が終わったら、使ったカードは捨て札となるよ。`,
    cmd: '/move_card 一般射撃魔法《シュート》,1050,450',
  };
  yield {
    msg: `捨て札は手札に回収することで再び使用できるようになるよ`,
    cmd: '/param_terrain 後攻,カウント,10',
  };

  yield {
    msg: `対戦相手も同じように手番を行ったらカウンタを動かすよ`,
    cmd: '/move_terrain 後攻,460,20',
  };
  yield {
    msg: `黄色いパネルを現在カウントと呼ぶよ。全員の手番がおわったら1マス進めるよ`,
    cmd: '/move_terrain 現在カウント,50,0',
  };
  yield {
    msg: `現在カウントがカウンタの下に来たら、手番になるよ`,
    cmd: '/move_terrain 現在カウント,250,0',
  };
  yield {
    msg: `右クリックで「カウンターボードを開く」を選ぶとカウンタの数値を簡単に変えられるよ`,
    cmd: '/open_counter_board',
  };
  yield {
    msg: `「カウンターボード」と「現在カウント」の２つのタブがあるから切り替えて使ってね`,
    cmd: '',
  };
  yield {
    msg: `チュートリアルは以上だよ。ここまで付き合ってくれてありがとう。`,
    cmd: '',
  };
  yield {
    msg: `Udonariumのロックを解除するよ。次へボタンを押してね`,
    cmd: '',
  };
}

// eslint-disable-next-line turbo/no-undeclared-env-vars
const gen = import.meta.env.DEV
  ? tutorilalGeneratorLocal()
  : tutorilalGenerator();
export const useUdonTurorialHooks = () => {
  const [msg, setMsg] = useState<string>(
    'チュートリアルを始めるよ。「次へ」ボタンを押してね。チュートリアルの間はUdonariumをロックさせてもらうね',
  );
  const dispatch = useAppDispatch();
  const [isGeneratorEnd, setIsGenEnd] = useState<boolean>(false);

  const nextHandler = () => {
    const r = gen.next();
    const v = r.value;
    setIsGenEnd(!!r.done);
    if (!v) return;
    setMsg(v.msg);
    if (!v.cmd) return;
    dispatch(
      sendUdonariumChatMessage({
        text: v.cmd,
        userId: 'System',
        playerName: 'System',
      }),
    );
  };
  return {
    nextHandler: nextHandler,
    msg,
    isGeneratorEnd,
  };
};
