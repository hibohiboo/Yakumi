import { Button } from '@blueprintjs/core';
import { CARDS } from '@yakumi-app/domain/hollow/constants';
import { basePath } from '@yakumi-app/router';
import React from 'react';

function HollowFluxPage() {
  const [cards, setCards] = React.useState(
    CARDS.map((card) => ({ ...card, count: 0 })),
  );
  return (
    <div>
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
      <a href={`/${basePath}/sample-image-deck.zip`}>
        <Button icon="download">ユドナリウム用デッキzipダウンロード</Button>
      </a>
      <div>
        現在のデッキ枚数:{' '}
        {cards.reduce((prev, current) => prev + current.count, 0)}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          height: '600px',
          overflow: 'auto',
        }}
      >
        {cards.map((card) => (
          <div key={card.name}>
            <img
              src={`/app/images/hollowFlux/cards/${card.name}.png`}
              width="350"
              style={{ display: 'block' }}
            />
            枚数:{' '}
            <input
              type="number"
              style={{ width: '3rem' }}
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
  );
}

export default HollowFluxPage;
