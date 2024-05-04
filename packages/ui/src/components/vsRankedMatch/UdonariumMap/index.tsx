import BattleGrid from './battleGrid';
import Grid from './grid';
import gridStyles from './grid.module.css';
import styles from './index.module.css';
export default function UdonariumMap() {
  return (
    <div className={styles.container}>
      <Grid />
      <div className={`${gridStyles.gridContainer} ${styles.baseContainer}`}>
        <div className={`${gridStyles.baseLayer} ${styles.baseLayer}`}>
          <BattleGrid className={styles.battleField} />
        </div>
      </div>
    </div>
  );
}
