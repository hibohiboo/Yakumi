import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <Link style={{ color: 'white' }} to={'/text/'}>
        テキストカードデッキ作成
      </Link>
    </div>
  );
}

export default App;
