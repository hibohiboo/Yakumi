/* eslint-disable no-irregular-whitespace */
import { Button } from '@blueprintjs/core';
import { CARDS } from '@yakumi-app/domain/hollow/constants';
import { createUdonariumZip } from '@yakumi-app/domain/hollow/createUdonariumZip';
import React from 'react';

function HollowFluxPage() {
  const [cards, setCards] = React.useState(
    CARDS.map((card) => ({ ...card, count: 0 })),
  );
  const [isDisplayCardNameOnly, setIsDisplayCardNameOnly] =
    React.useState(false);
  const [deckName, setDeckName] = React.useState('HollowFluxデッキ');
  const [deckDescription, setDeckDescription] = React.useState('');
  const [cards2, setCards2] = React.useState(
    CARDS.map((card) => ({ ...card, count: 0 })),
  );
  const [deckName2, setDeckName2] = React.useState('HollowFluxガードデッキ');
  const [deckDescription2, setDeckDescription2] =
    React.useState('ガードデッキは10枚まで');
  return (
    <div style={{ padding: '1rem' }}>
      <h1> HollowΦFluxデッキ作成</h1>
      <div>
        <a
          style={{ color: 'white' }}
          href="https://hollowperception.wixsite.com/hollowflux"
          target="_blank"
        >
          HollowΦFluxルールページ
        </a>
      </div>
      <div>
        <label>
          デッキ名:{' '}
          <input
            type="text"
            value={deckName}
            onChange={(e) => {
              setDeckName(e.target.value);
            }}
          />
        </label>
        <label>
          デッキ説明:{' '}
          <textarea
            value={deckDescription}
            onChange={(e) => {
              setDeckDescription(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <Button
          icon="download"
          onClick={() => {
            const list = cards.filter((card) => card.count > 0);
            if (list.length === 0) {
              alert('カードを選択してください');
              return;
            }
            const list2 = cards2.filter((card) => card.count > 0);
            createUdonariumZip(
              list,
              deckName,
              deckDescription,
              list2,
              deckName2,
              deckDescription2,
            );
          }}
        >
          ユドナリウム用デッキzipダウンロード
        </Button>
      </div>

      <div style={{ padding: '1rem' }}>
        <details>
          <summary>キーワード</summary>
          <dl>
            <dt>自動</dt>
            <dd>記述されているタイミングで効果を発揮する、「自動能力」。</dd>
            <dd>
              自動能力はインタラプション・タイミングを発生させないため、これらに対応してカー
              ドをプレイしたり、起動能力を用いたりといったことは出来ない。
            </dd>
            <dt>【ダメージトリガー】</dt>
            <dd>
              「このカードがダメージによってガードデッキからダメージフィールドに置かれる時、こ
              れを公開してもよい。
              そうした場合、"効果"を解決した上で、表向きでダメージフィールドに移動させる。」
            </dd>
            <dd>
              なお、ダメージトリガーはインタラプション・タイミングを発生させない。また、ダ
              メージトリガーはキャラクターカードが持っているものでも「能力」として扱わない。そ
              の為、たとえば「キャラクターの能力を受けない。」という能力を持っているキャラク
              ターが居たとしても、それを無視する。（「キャラクターカードの効果を受けない。」と
              なっている場合は、ダメージトリガーの効果も受けないことが出来る。）
            </dd>
            <dt>【反撃】 </dt>
            <dd>
              通常は一方的に攻撃ダメージを受けるのに対して、これを
              持っている場合、ダメージを与え返すことが出来る。但し、【反撃】を持っているだけで
              はこの効果は適用されず、防御が成功している必要がある。【反撃】を複数持っている場
              合、防御成功時にその数だけダメージを与える。
            </dd>
            <dd>
              なお、攻撃ダメージと【反撃】によるダメージは同時に与えられるため、【反撃】ダメージで攻撃キャラクターが破壊される場合でも、攻撃ダメージが無効になることはない。
            </dd>
            <dd>
              「[自動]：このキャラクターによる防御が成功した後の攻撃ダメージ解決時、これに攻撃
              したキャラクター一体を対象とし、それにＸダメージを与える。Ｘはこれのパワーに等しい。」
            </dd>
            <dt>【警戒】 </dt>
            <dd>
              これを持っている場合、自分ターンで攻撃を行ったり起動能力を使うなどしてスリープになった場合でも、
              相手ターンに防御などを行うことが出来る。
            </dd>
            <dd>
              「[自動]：対戦相手のアクティブフェイズ終了時、このキャラクターをアクティブにする。」
            </dd>
            <dt>【貫通】</dt>
            <dd>
              これを持っている場合、キャラクターを破壊した時に損害を
              プレイヤーへと貫通させることが出来る。【貫通】を複数持っている場合、キャラクター
              破壊時に、その数だけこの処理が繰り返される。
            </dd>
            <dd>
              「[自動]：このキャラクターが攻撃によるダメージによってキャラクターを破壊した場合、
              破壊したキャラクターのプレイヤーに１ダメージを与える。」
            </dd>
            <dt>【強撃】</dt>
            <dd>
              これを持っている場合、プレイヤーに与えるダメージが強化される。【強撃】を複数持っている場合、その数だけプレイヤーに与えるダメージが増加する。
            </dd>
            <dd>
              「[自動]：このキャラクターが攻撃によってプレイヤーに与えるダメージに＋１する。」
            </dd>
            <dt>【死殺】</dt>
            <dd>
              これを持っている場合、破壊効果やダメージなどによって破壊されなくなる。但し、パワーが０以下になったことによる破壊を防ぐことは出来ない。
              また、「破壊」を介さず直接トラッシュに置く効果や、手札・デッキに加える効果、ゲームから除外する効果などは受けることに注意。
            </dd>
            <dd>「[自動]：このキャラクターは破壊されない。」</dd>
            <dt>【神速】</dt>
            <dd>
              これを持っている場合、【神速】を持っているキャラクター以外に攻撃を防御されなくなる。
            </dd>
            <dd>
              「［自動］：このキャラクターが戦場に居る限り、このキャラクターの攻撃は、【神速】を持たないキャラクターには防御されない。」
            </dd>
            <dt>【奥義：○○】</dt>
            <dd>
              これを持っている場合、そのカードをデッキに採用しているプレイヤーは、ゲーム開始時に自分のガードデッキのカードを任意の枚数、公開する。
            </dd>
            <dd>
              また、これを持ったカードは、戦場に自分の対応カードが存在しているか、自分のガードデッキの公開されたカードの中に対応カードが存在しない場合、プレイ出来ない。
            </dd>
            <dd>
              「○○」には対応カードの条件が入る。何らかのワードが書かれている場合、それをカード名に含むカードが対応カードとなる。
              「[条件]」と書かれている場合、その条件を満たすカードが対応カードとなる。
            </dd>
            <dd>
              「ゲーム開始時、あなたは自分のガードデッキのカードを任意の枚数表向きにし、ガードデッキから移動するまでそのままにする。戦場かガードデッキに、○○を満たすあなたのカードが無ければこのカードはプレイ出来ない。」
            </dd>
            <dt>【空装　条件：○○　効果：××】</dt>
            <dd>
              これを持っている場合、ゲーム開始時に自分のデッキが『条件』を満たしているならば、このカードをガードデッキから公開し、ゲーム終了時まで『効果』を得ることが出来る。
              同時に複数の【空装】を適用することは出来ない。
            </dd>
            <dd>
              また、【空装】の『効果』によって専用の追加デッキを使用することが出来る場合がある。
              その際、追加デッキの構成ルールは通常のデッキ構成ルールおよび【空装】の『条件』に従い、７枚で作る。
              例えばメインデッキおよびガードデッキに３枚入っているカードを追加デッキに入れることは出来ない。なお、追加デッキもデッキの一つであるので内容は非公開であり、中に含まれるカードも通常のカードと同じ扱いをする。
              但し、持ち主はいつでも内容を見ることが出来る。
            </dd>
            <dd>
              「ゲーム開始時、あなたのデッキがこのカードの【空装】に書かれた『条件』を満たしている場合、あなたは自分のガードデッキにあるこのカードを表向きにし、ガードデッキから移動するまでそのままにする。
              （表向きにしたこのカードの【空装】に書かれた『条件』が通常のデッキ構成のルールに
              違反している場合、あなたは『条件』に示された範囲で通常のルールを逸脱した構成の
              デッキを使用することが出来る。）
              そうした場合、ゲーム終了時まで、あなたはこのカードの【空装】に書かれた『効果』を得る。
              但し、【空装】を持つカードを【空装】の効果によって同時に複数枚公開することは出来ない。
              また、【空装】の『効果』によって追加デッキを使用する場合、通常のデッキ構成のルールおよびこのカードの【空装】に書かれた『条件』に従ってそれをゲーム開始前に作成し、合計枚数は７枚となる。
              ゲーム中の下限枚数は０であり、上限枚数は無い。
              効果の解決中でない限り、あなたはいつでも追加デッキの内容を確認することが出来る。」
            </dd>
          </dl>
        </details>
      </div>
      <div>
        <label>
          カード名のみ表示
          <input
            type="checkbox"
            checked={isDisplayCardNameOnly}
            onChange={() => {
              setIsDisplayCardNameOnly(!isDisplayCardNameOnly);
            }}
          />
        </label>
      </div>
      <div>
        <div style={{ paddingBottom: '1rem' }}>
          現在のデッキ枚数:{' '}
          {cards.reduce((prev, current) => prev + current.count, 0)}
        </div>
        <div>
          {cards
            .filter((card) => card.count > 0)
            .flatMap((card) =>
              new Array(card.count).fill(0).map((_, i) => (
                <span
                  key={`${card.name}-${i}`}
                  style={{
                    border: 'solid 1px #fff',
                    display: 'inline-block',
                    margin: '0.2rem',
                    padding: '1px 5px',
                    borderRadius: '5px',
                  }}
                >
                  {card.name}
                </span>
              )),
            )}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            height: isDisplayCardNameOnly ? '200px' : '600px',
            overflow: 'auto',
          }}
        >
          {cards.map((card) => (
            <div key={card.name} style={{ width: '360px' }}>
              <img
                src={`/assets/images/hollowFlux/cards/${card.name}.png`}
                width="350"
                style={{
                  display: isDisplayCardNameOnly ? 'none' : 'block',
                }}
                alt={card.name}
              />
              <strong>[{card.name}]</strong> 枚数:
              <input
                type="number"
                style={{
                  width: '3.5rem',
                  padding: '0.3rem',
                  fontSize: '1.2rem',
                }}
                value={card.count}
                max={3}
                min={0}
                onChange={(e) => {
                  setCards(
                    cards.map((c) => {
                      if (c.name === card.name) {
                        return { ...c, count: e.target.valueAsNumber };
                      }
                      return c;
                    }),
                  );
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          <label>
            デッキ名:{' '}
            <input
              type="text"
              value={deckName2}
              onChange={(e) => {
                setDeckName2(e.target.value);
              }}
            />
          </label>
          <label>
            デッキ説明:{' '}
            <textarea
              value={deckDescription2}
              onChange={(e) => {
                setDeckDescription2(e.target.value);
              }}
            />
          </label>
        </div>
        <div style={{ paddingBottom: '1rem' }}>
          現在のガードデッキ枚数:{' '}
          {cards2.reduce((prev, current) => prev + current.count, 0)}
        </div>
        <div>
          {cards2
            .filter((card) => card.count > 0)
            .flatMap((card) =>
              new Array(card.count).fill(0).map((_, i) => (
                <span
                  key={`${card.name}-${i}`}
                  style={{
                    border: 'solid 1px #fff',
                    display: 'inline-block',
                    margin: '0.2rem',
                    padding: '1px 5px',
                    borderRadius: '5px',
                  }}
                >
                  {card.name}
                </span>
              )),
            )}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            height: '600px',
            overflow: 'auto',
          }}
        >
          {cards2.map((card) => (
            <div key={card.name} style={{ width: '360px' }}>
              <img
                src={`/assets/images/hollowFlux/cards/${card.name}.png`}
                width="350"
                style={{
                  display: isDisplayCardNameOnly ? 'none' : 'block',
                }}
                alt={card.name}
              />
              <strong>[{card.name}]</strong> 枚数:
              <input
                type="number"
                style={{
                  width: '3.5rem',
                  padding: '0.3rem',
                  fontSize: '1.2rem',
                }}
                value={card.count}
                max={3}
                min={0}
                onChange={(e) => {
                  setCards2(
                    cards2.map((c) => {
                      if (c.name === card.name) {
                        return { ...c, count: e.target.valueAsNumber };
                      }
                      return c;
                    }),
                  );
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HollowFluxPage;
