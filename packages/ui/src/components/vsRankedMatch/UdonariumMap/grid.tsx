import styles from './grid.module.css';
const mapNumbers = new Array(20 * 15).fill(0).map((_, i) => i);
const spiralNumbers = getSpiralNumbers(15, 20);
export default function Grid() {
  return (
    <div className={styles.gridContainer}>
      {mapNumbers.map((i) => (
        <div className={styles.gridItem} key={i}>
          {spiralNumbers[i] - 1}
        </div>
      ))}
    </div>
  );
}

function getSpiralNumbers(rows: number, cols: number) {
  const result = new Array(rows * cols).fill(0);
  let num = 1;
  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;

  while (true) {
    for (let i = left; i <= right; i++) result[top * cols + i] = num++;
    if (++top > bottom) break;
    for (let i = top; i <= bottom; i++) result[i * cols + right] = num++;
    if (--right < left) break;
    for (let i = right; i >= left; i--) result[bottom * cols + i] = num++;
    if (--bottom < top) break;
    for (let i = bottom; i >= top; i--) result[i * cols + left] = num++;
    if (++left > right) break;
  }

  return result;
}
