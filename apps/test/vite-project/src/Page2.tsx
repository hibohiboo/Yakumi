import React from 'react';
import { Link } from 'react-router-dom';

const Page2: React.FC = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <nav style={{ marginTop: '20px' }}>
        <Link to="/" style={{ color: '#646cff', textDecoration: 'underline' }}>
          Back to Home
        </Link>
      </nav>
    </div>
  );
};

export default Page2;
