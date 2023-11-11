import { Link } from 'react-router-dom';
import { basePath } from './router';

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <ul>
        <li>
          <Link style={{ color: 'white' }} to={'/text/'}>
            テキストカードデッキ作成
          </Link>
        </li>
        <li>
          <Link style={{ color: 'white' }} to={'/image/'}>
            画像カードデッキ作成
          </Link>
        </li>
      </ul>

      <section>
        <h2>使い方</h2>
        <p>1. デッキ用のフォルダが含まれたzipをダウンロードして解凍します</p>
        <img
          src={`/${basePath}/images/sample-text-deck-01.png`}
          alt="ダウンロード参考用画像"
        />
        <p>
          2.「フォルダ選択」ボタンを押して、
          解凍したフォルダを選択してください。確認がでるので、フォルダ読取りの許可を与えてください。
        </p>
        <img
          src={`/${basePath}/images/sample-text-deck-02.png`}
          alt="フォルダ選択参考用画像"
        />
        <img src={`/${basePath}/images/sample-text-deck-04.png`} alt="許可" />
        <p>
          ※2回目の選択ではフォルダが最初から選択された状態になります。何もファイルが表示されるかもしれませんがそのまま選択して大丈夫です。
        </p>
        <img
          src={`/${basePath}/images/sample-text-deck-03.png`}
          alt="2回目以降のフォルダ選択参考用画像"
        />
        <p>3. Udonarium用カードダウンロードでUdonarium用のデッキを作成します</p>
        <img
          src={`/${basePath}/images/sample-text-deck-05.png`}
          alt="Udonarium用カードダウンロード参考用画像"
        />
        <h3>テキストファイルの編集について</h3>
        テキストファイルは、ユドナリウムのデッキ、カードの設定に下記のように対応しています。
        <table>
          <caption>settings.txt</caption>
          <thead>
            <tr>
              <th>項目名</th>
              <th>説明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>デッキ名</td>
              <td>山札設定のname</td>
            </tr>
            <tr>
              <td>表裏</td>
              <td>山札の状態を初期で表にしておくか、裏にしておくか</td>
            </tr>
            <tr>
              <td>カードサイズ</td>
              <td>カードのサイズ設定</td>
            </tr>
            <tr>
              <td>説明</td>
              <td>山札の説明</td>
            </tr>
          </tbody>
        </table>
        <table>
          <caption>text.csv</caption>
          <thead>
            <tr>
              <th>項目名</th>
              <th>説明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>カード名</td>
              <td>カードの名前。漢字(かんじ)の記法でルビを振ることが可能。</td>
            </tr>
            <tr>
              <td>カード内容</td>
              <td>情報カード本文。""で囲むと改行も可能。</td>
            </tr>
            <tr>
              <td>id</td>
              <td>カードのID。カードの左下に表示。</td>
            </tr>
            <tr>
              <td>種別</td>
              <td>カードの種別。カード下部中央に表示</td>
            </tr>
          </tbody>
        </table>
        <img
          src={`/${basePath}/images/sample-text-deck-06.png`}
          alt="テキストファイルの編集参考用画像"
        />
      </section>
    </div>
  );
}

export default App;
