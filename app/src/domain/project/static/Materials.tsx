import BaseWrapper from '../atoms/BaseWrapper';
import styles from './Materials.module.css';

export function Materials() {
  return (
    <BaseWrapper>
      <div
        style={{
          overflow: 'auto',
          height: '100vh',
          padding: '0.5rem',
          fontSize: '1rem',
        }}
      >
        <h1>利用素材</h1>
        <p>本サイトは下記素材を利用しています</p>
        <table className={styles.table}>
          <thead>
            <th>サイト名</th>
            <th>利用素材</th>
            <th>ライセンス</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <a
                  href="https://game-icons.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Game-icons.net
                </a>
              </td>
              <td>アイコン素材</td>
              <td>
                <a
                  href="https://creativecommons.org/licenses/by/3.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CC BY 3.0
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  href="https://fontawesome.com/search?m=free&o=r"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Font Awesome
                </a>
              </td>
              <td>アイコン素材</td>
              <td>
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CC BY 4.0
                </a>
                <a href="https://fontawesome.com/license/free">MIT</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseWrapper>
  );
}
