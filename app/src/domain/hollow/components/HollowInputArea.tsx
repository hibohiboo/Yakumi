import { UseHollowViewModel } from '../hooks/useHollow';
import { getHollowImageSrc } from '../image/getHollowImageSrc';

export function HollowInputArea({ vm }: { vm: UseHollowViewModel }) {
  return (
    <div style={{ height: '80vh', overflow: 'auto' }}>
      {vm.cards.map((card) => (
        <div key={card.name} style={{ width: '360px' }}>
          <img
            src={getHollowImageSrc(
              `/assets/images/hollowFlux/cards/${card.name}.png`,
            )}
            width="15"
            style={{ cursor: 'pointer' }}
            alt={card.name}
            onClick={() => vm.cardClickHandler(card)}
          />
          <label>
            <input
              title="デッキ"
              type="number"
              value={card.deck}
              max={3 - card.guard}
              min={0}
              style={{ width: '2rem' }}
              onChange={vm.changeHandler(card)}
            />
          </label>
          <label>
            <input
              title="ガードデッキ"
              type="number"
              style={{ width: '2rem' }}
              value={card.guard}
              max={3 - card.deck}
              min={0}
              onChange={vm.changeGuardHandler(card)}
            />
          </label>

          <strong>{card.name}</strong>
        </div>
      ))}
    </div>
  );
}
