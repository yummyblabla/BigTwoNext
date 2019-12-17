/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import io from 'socket.io-client';

import withRedux from '../redux/redux';


const Index = () => {
  const [username, setUsername] = useState('');

  let socket = null;
  const connect = () => {
    socket = io();
  };

  const createRoom = () => {
    socket.emit('createRoom', {
      name: 'Room1',
    });
  }

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <p>Hello Next.js</p>
      <Link href="/game">
        <a>To Game</a>
      </Link>
      <br />
      <Link href="/lobby">
        <a>To Lobby</a>
      </Link>
      <br />
      <button onClick={connect}>Connect</button>
      <button onClick={createRoom}>Create room</button>
    </div>
  );
};

// Index.getInitialProps = ({ reduxStore }) => {
//   const { dispatch } = reduxStore;
//   return {};
// }

export default withRedux(Index);
