/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import withRedux from '../redux/redux';
import { setUsername } from '../redux/actionCreators';

const Index = () => {
  const router = useRouter();
  const [username, set$Username] = useState('');

  const dispatch = useDispatch();


  const connect = (e) => {
    e.preventDefault();
    dispatch(setUsername(username));
    router.push('/lobby');
  };

  return (
    <div>
      <h1>Index Page</h1>

      <form>
        <label htmlFor="username">
          Name:
          <input id="username" type="text" value={username} onChange={(e) => set$Username(e.target.value)} />
        </label>
        <input type="submit" value="Submit" onClick={connect} />
      </form>

      <button type="button" onClick={connect}>Connect</button>
    </div>
  );
};

export default withRedux(Index);
