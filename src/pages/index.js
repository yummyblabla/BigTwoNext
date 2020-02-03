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
    <div className="flex-column justify-center align-center">
      <Head>
        <title>BigTwo.io</title>
        <script data-ad-client="ca-pub-8458686627075146" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      </Head>
      <div className="background-white margin-20 border-radius-20">
        <form className="text-align-center margin-20">
          <p className="font-size-3rem margin-bot-10 color-dark-two">
            BigTwo.io
          </p>
          <br />
          <label htmlFor="username">
            <span className="font-size-1rem color-dark-two">Enter a unique username!</span>
            <br />
            <input
              autoFocus
              className={`margin-bot-20 font-size-1rem padding-5 margin-top-5 ${username.length >= 2 && username.length <= 8 ? 'border-green' : 'border-red'}`}
              id="username"
              type="text"
              value={username}
              onChange={(e) => set$Username(e.target.value)}
              placeholder="Username"
            />
          </label>
          <br />
          <input className="button padding-10 border-radius-10 background-green width-90" type="submit" value="Connect" onClick={connect} />
        </form>
      </div>
      <div className="background-white margin-20 border-radius-20 text-align-center">
        <div className="margin-20">
          <a className="title" href="https://en.wikipedia.org/wiki/Big_two">What is BigTwo?</a>
          <p>Play with friends and with up to 4 players!</p>
          <p>Includes a point tracking system!</p>
          <br />
          <p>
            In Development: Game Version - Vietnamese + Game ending when reaching point threshold
          </p>
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

        `}
      </style>
    </div>
  );
};

export default withRedux(Index);
