/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import withRedux from '../redux/redux';


const Index = () => {
  const [username, setUsername] = useState('');
  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <p>Hello Next.js</p>
      <Link href="/game">
        <a>To Game</a>
      </Link>
    </div>
  );
};

// Index.getInitialProps = ({ reduxStore }) => {
//   const { dispatch } = reduxStore;
//   return {};
// }

export default withRedux(Index);
