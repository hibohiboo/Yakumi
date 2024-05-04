import AttributeCard from '../Attribute/AttributeCard';
import styles from './AttributeCardDescription.module.css';
import CircleChar from './RoundNumber';

const args = {
  name: 'ファイアボルト',
  timing: '手番',
  cp: 10,
  countdown: '5',
  range: '3',
  cost: 'MP5',
  content: `1体のHPに5ダメージ`,
  flavor: `火の精霊よ、我が指先より舌を伸ばせ

──"火蜥蜴の尾" ニンテンカ`,
  id: '',
  tags: ['火', '魔術', '攻撃'],
  type: '攻撃',
};
export default function AttributeCardDescription() {
  return (
    <div>
      <h2>カードの説明</h2>
      <p></p>
      <div style={{ display: 'flex', padding: '15px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 'fix-content', boxSizing: 'content-box' }}>
            <AttributeCard {...args} />
          </div>

          <CircleChar value="1" x={35} y={0} />
          <CircleChar value="2" x={-10} y={10} />
          <CircleChar value="3" x={140} y={20} />
          <CircleChar value="4" x={-10} y={40} />
          <CircleChar value="5" x={130} y={45} />
          <CircleChar value="6" x={-10} y={65} />
          <CircleChar value="7" x={-15} y={90} />
          <CircleChar value="8" x={-15} y={270} />
          <CircleChar value="9" x={105} y={300} />
          {/* <CircleChar value="10" x={55} y={300} /> */}
        </div>
        <div style={{ paddingLeft: '20px' }}>
          <dl className={styles.dl}>
            <dt>1. カード名</dt>
            <dd>カードの名前</dd>
            <dt>2. タイミング</dt>
            <dd>
              カードを使用できるタイミング。下記のタイミングがある。
              <dl>
                <dt>手番</dt>
                <dd>自分の手番に使用できる。</dd>
                <dt>割込</dt>
                <dd>手番に関わらず好きなタイミングに割込んで使用できる。</dd>
                <dt>条件</dt>
                <dd>条件を満たしたタイミングに使用できる。</dd>
                <dt>常時</dt>
                <dd>常に効果を発揮する。</dd>
                <dt>戦闘外</dt>
                <dd>
                  戦闘では使用しない。キャラクターメイク時のみに意味がある。
                </dd>
              </dl>
            </dd>
            <dt>3. CP</dt>
            <dd>
              キャラクターポイント。カードを獲得するために必要なポイント。
            </dd>
            <dt>4. カウント</dt>
            <dd>カードプレイ時にこの数値だけカウンターコマを進める。</dd>
            <dt>5. 射程</dt>
            <dd>
              カードの効果の対象を選択できる範囲。対象選択後、割込タイミングの効果で対象が射程外になった場合、対象にカードの効果は適用されない。
              <br />
              （例）射程2であれば、下記の範囲内の対象を選択できる。
              <div className={styles.rangeSample}>
                {new Array(4)
                  .fill(0)
                  .map((_, i) =>
                    new Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <div key={`${i}${j}`}>
                          {i === 3 && j === 2 ? '●' : ''}
                        </div>
                      )),
                  )}
              </div>
            </dd>
            <dt>6. コスト</dt>
            <dd>
              コスト分のリソースを消費してカードをプレイする。消費できない場合はプレイできない。
            </dd>
            <dt>7. 効果</dt>
            <dd>カードの効果。</dd>
            <dt>8. フレーバー</dt>
            <dd>ゲームのプレイやルールに関係のない文</dd>
            <dt>9. タグ</dt>
            <dd>タグ自体に意味はない。カードの効果で参照されることがある。</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
