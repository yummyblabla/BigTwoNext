/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';

import withRedux from '../redux/redux';
import { setUsername, setSocket } from '../redux/actionCreators';

import IndexErrorModal from '../components/Modals/ErrorModal';

const Index = () => {
  const router = useRouter();
  const [username, set$Username] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  const dispatch = useDispatch();

  const connect = (e) => {
    e.preventDefault();
    fetch(`/api/checkUserTaken?username=${username}`)
      .then((response) => response.json())
      .then(({ userTaken, message }) => {
        if (userTaken) {
          setErrorMessage(message);
          setErrorModal(true);
        } else {
          dispatch(setSocket(io(), username));
          dispatch(setUsername(username));
          router.push('/lobby');
        }
      });
  };

  return (
    <div className="page">
      <Head>
        <title>BigTwo.io</title>
        <script data-ad-client="ca-pub-8458686627075146" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      </Head>
      <div className="background-white margin-20 border-radius-20">
        <form className="text-align-center margin-20">
          <p className="title color-dark-two">
            BigTwo.io
          </p>
          <br />
          <label htmlFor="username">
            <span className="labelTitle color-dark-two">Enter a unique username!</span>
            <br />
            <input
              autoFocus
              className={`usernameInput ${username.length >= 2 && username.length <= 8 ? 'validUsername' : 'invalidUsername'}`}
              id="username"
              type="text"
              value={username}
              onChange={(e) => set$Username(e.target.value)}
              placeholder="Username"
            />
          </label>
          <br />
          <input className="submit background-green" type="submit" value="Connect" onClick={connect} />
        </form>
      </div>
      <div className="background-white margin-20 border-radius-20 text-align-center">
        <div className="margin-20">
          <a className="title" href="https://en.wikipedia.org/wiki/Big_two">What is BigTwo?</a>
          <p>Play with friends and with up to 4 players!</p>
          <p>Includes a point tracking system!</p>
          <br />
          <p>In Development: Game Version - Vietnamese + Game ending when reaching point threshold</p>
        </div>
      </div>

      <IndexErrorModal
        errorModal={errorModal}
        setErrorModal={setErrorModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <style jsx>
        {`
          .page {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          form .title {
            font-size: 3rem;
            margin-bottom: 1rem;
          }

          .usernameInput {
            margin-top: 5px;
            padding: 5px;
            font-size: 1rem;
          }

          .labelTitle {
            font-size: 1rem;
          }

          .validUsername {
            border: 3px solid green;
          }

          .invalidUsername {
            border: 3px solid red;
          }

          .submit {
            margin-top: 20px;
            padding: 10px;
            border: none;
            border-radius: 10px;
            width: 90%;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default withRedux(Index);
