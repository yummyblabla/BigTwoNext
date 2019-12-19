/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import withRedux from '../redux/redux';


const Index = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();


  const connect = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_USERNAME', username });
    router.push('/lobby');
  };

  return (
    <div>
      <h1>Index Page</h1>

      <form>
        <label htmlFor="username">
          Name:
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <input type="submit" value="Submit" onClick={connect} />
      </form>

      <button onClick={connect}>Connect</button>
    </div>
  );
};

export default withRedux(Index);
