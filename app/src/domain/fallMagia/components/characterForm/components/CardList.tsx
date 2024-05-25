import { FallMagiaCharacterPageViewModel } from '@yakumi-app/domain/fallMagia/hooks/fallMagiaCharacterPageHooks';
import { VSAttributeCard } from '@yakumi-components/index';

export function CardList({
  vm,
}: {
  vm: Pick<
    FallMagiaCharacterPageViewModel,
    'itemsWithTypes' | 'listRefs' | 'onCardClick' | 'isLoading'
  >;
}) {
  return vm.itemsWithTypes.map((obj) => {
    return (
      <div key={obj.type}>
        <h3>{obj.label}</h3>
        <details open={true}>
          <summary>カード一覧</summary>
          <div
            style={{
              background: 'white',
              color: 'black',
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {obj.items.map((item) => (
              <div
                ref={vm.listRefs.current[item.index]}
                key={item.index}
                style={{ width: 'fit-content' }}
              >
                <VSAttributeCard
                  {...item}
                  onClick={() => vm.onCardClick(item.name)}
                  selected={item.count > 0 && !vm.isLoading}
                />
              </div>
            ))}
          </div>
        </details>
      </div>
    );
  });
}
