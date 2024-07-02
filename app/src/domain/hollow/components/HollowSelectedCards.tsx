import { UseHollowViewModel } from '../hooks/useHollow';

export function HollowSelectedCards({
  vm,
  target,
}: {
  vm: UseHollowViewModel;
  target: 'deck' | 'guard';
}) {
  const filteredCards = vm.cards.filter((card) => card[target] > 0);
  return (
    <div>
      {target === 'deck' ? 'デッキ' : 'ガードデッキ'}
      {filteredCards.length === 0 && 'がありません'}
      {filteredCards.length > 0 &&
        `${filteredCards.reduce((a, b) => a + b[target], 0)}枚：`}
      {filteredCards.flatMap((card) =>
        new Array(card[target]).fill(0).map((_, i) => (
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
  );
}
