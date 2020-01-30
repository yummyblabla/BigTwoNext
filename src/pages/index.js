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
import * as Color from '../constants/colors';

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
        <title>Big Two</title>
        <script data-ad-client="ca-pub-8458686627075146" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>
      <div className="loginContainer">
        <form>
          <p className="title">
            Play BigTwo
          </p>
          <br />
          <label htmlFor="username">
            Choose a unique username!
            <br />
            <input autoFocus className="usernameInput" id="username" type="text" value={username} onChange={(e) => set$Username(e.target.value)} placeholder="Username" />
          </label>
          <br />
          <input className="submit" type="submit" value="Connect" onClick={connect} />
        </form>
      </div>
      <div className="description-container">
        <div className="description">
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
      <style jsx global>
        {`
          body {
            margin: 0;
            padding: 0;
            background-color: ${Color.DARK_THREE};
            font-family: Arial;
          }
        `}
      </style>
      <style jsx>
        {`
          .page {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .loginContainer {
            border: 1px solid black;
            background-color: ${Color.DARK_TWO};
            margin: 20px;
            border-radius: 10px;
          }

          form {
            text-align: center;
            margin: 20px;
            color: ${Color.DARK_FOUR};
          }

          form .title {
            font-size: 2rem;
            margin-bottom: 0;
            color: ${Color.DARK_FOUR};
          }

          .usernameInput {
            margin-top: 5px;
          }

          .submit {
            margin-top: 20px;
            padding: 10px;
            border: none;
            border-radius: 10px;
            background-color: ${Color.GREEN};
            width: 90%;
            cursor: pointer;
          }

          .submit:hover {
            background-color: ${Color.GREEN_HOVER};
          }

          .description-container {
            border: 1px solid black;
            background-color: #ffffff;
            margin: 20px;
            border-radius: 10px;
            text-align: center;
          }

          .description {
            margin: 20px;
          }
          .description .title {
            font-size: 1.5rem;
          }
        `}
      </style>
    </div>
  );
};

export default withRedux(Index);
