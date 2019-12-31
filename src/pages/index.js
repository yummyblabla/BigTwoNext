/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import withRedux from '../redux/redux';
import { setUsername, setSocket } from '../redux/actionCreators';


const Index = () => {
  const router = useRouter();
  const [username, set$Username] = useState('');

  const dispatch = useDispatch();

  const connect = (e) => {
    e.preventDefault();
    fetch(`/api/checkUserTaken?username=${username}`)
      .then((response) => response.json())
      .then(({ userTaken }) => {
        if (userTaken) {
          alert('Username taken. Choose another one.');
        } else {
          dispatch(setSocket(io(), username));
          dispatch(setUsername(username));
          router.push('/lobby');
        }
      });
  };

  return (
    <div className="container">
      <p className="title">Play BigTwo</p>

      <form>
        <label htmlFor="username">
          Choose a Username to play!
          <br />
          <input className="usernameInput" id="username" type="text" value={username} onChange={(e) => set$Username(e.target.value)} />
        </label>
        <br />
        <input className="submitButton" type="submit" value="Submit" onClick={connect} />
      </form>

      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .title {
            font-size: 2rem;
            text-align: center;
          }

          form {
            text-align: center;
            
          }

          .usernameInput {
            margin-top: 5px;
          }

          .submitButton {
            margin-top: 20px;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default withRedux(Index);
