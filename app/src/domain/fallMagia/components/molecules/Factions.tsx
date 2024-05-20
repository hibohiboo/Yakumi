import { Scene4SelectItem } from '../../services/scene4Items';

export function Factions({
  style,
  items,
  setItem,
  selectedItem,
}: {
  style: React.CSSProperties;
  items: Scene4SelectItem[];
  setItem: (item: Scene4SelectItem) => void;
  selectedItem?: Scene4SelectItem;
}) {
  return (
    <div style={style}>
      {items.map((item) => (
        <div
          key={item.tag}
          style={{
            border: 'solid 2px',
            borderColor: item.tag === selectedItem?.tag ? 'yellow' : 'white',
            cursor: 'pointer',
            margin: '5px',
          }}
          onClick={() => setItem(item)}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
