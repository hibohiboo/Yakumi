import styles from './battleGrid.module.css';

const rows = 11;
const cols = 11;
const mapNumbers = Array.from({ length: rows * cols }, (_, i) => {
  const row = Math.floor(i / cols);
  const col = i % cols;
  if (row === 0 && col === 0) return '';
  if (col === 0) return row - 1;
  if (row === 0) return String.fromCharCode(64 + col);
  return `${String.fromCharCode(64 + col)} ${row - 1}`; // 65 is the ASCII value for 'A'
});

export default function BattleGrid({
  style,
  className,
}: {
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div className={`${styles.gridContainer} ${className}`} style={style}>
      {mapNumbers.map((cell, i) => (
        <div className={styles.gridItem} key={i}>
          {cell}
        </div>
      ))}
    </div>
  );
}
