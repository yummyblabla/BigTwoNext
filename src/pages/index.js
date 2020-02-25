/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import withRedux from '../redux/redux';
import { setUsername, setSocket } from '../redux/actionCreators';
import variables from '../styles.scss';

import IndexErrorModal from '../components/Modals/ErrorModal';

const Index = () => {
  const router = useRouter();
  const [username, set$Username] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  const dispatch = useDispatch();

  const connect = (e) => {
    e.preventDefault();
    fetch(`${process.env.socketUrl}/api/checkUserTaken?username=${username}`)
      .then((response) => response.json())
      .then(({ userTaken, message }) => {
        if (userTaken) {
          setErrorMessage(message);
          setErrorModal(true);
        } else {
          dispatch(setSocket(io(`${process.env.socketUrl}`), username));
          dispatch(setUsername(username));
          router.push('/lobby');
        }
      });
  };

  const connectAsGuest = (e) => {
    e.preventDefault();
    fetch(`${process.env.socketUrl}/api/connectAsGuest`)
      .then((response) => response.json())
      .then(({ username: $username }) => {
        dispatch(setSocket(io(`${process.env.socketUrl}`), $username));
        dispatch(setUsername($username));
        router.push('/lobby');
      });
  };

  return (
    <div className="flex-column justify-center align-center page">
      <Head>
        <title>BigTwo.io | Play Big Two</title>
        <script data-ad-client="ca-pub-8458686627075146" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
        <meta charSet="UTF-8" />
        <meta name="description" content="BigTwo HTML5 Card Game with Socket.io. Play with up to 4 players and see who is better in this classic card game!" />
        <meta name="keywords" content="BigTwo,Big2,Big Two,IO,Cards,Game,Canvas,WebGL,PixiJS,HTML5,Socket.io,PlayBigTwo,Play BigTwo,Play Big Two,Multiplayer,Card Game,Asian,Chinese,Vietnamese" />
        <meta name="author" content="Derrick Lee" />
        <meta name="language" content="en" />
        <link rel="icon" type="image/png" href="favicon.ico" />
        <link rel="apple-touch-icon" href="favicon.ico" />
        <link rel="canonical" href="https://bigtwo.io" />
      </Head>
      <div className="flex-row flex-wrap justify-center mobile">
        <div className="background-white margin-20 border-radius-20 padding-30 padding-bottom-20 border-dark-one secondary width-200px text-align-center">
          <Link href="/about">
            <a className="color-dark-two">
              About the Developer
            </a>
          </Link>
        </div>

        <div className="background-white margin-20 border-radius-20 padding-30 padding-top-10 padding-bottom-20 border-dark-one main">
          <h1 className="font-size-3rem text-align-center color-dark-two margin-bottom-30">
            BigTwo.io
          </h1>
          <form className="text-align-center margin-20 margin-top-10">
            <label htmlFor="username">
              <span className="font-size-1rem color-dark-two">Enter a unique username!</span>
              <br />
              <input
                autoFocus
                className={`margin-bottom-20 font-size-1rem padding-5 margin-top-5 ${username.length >= 2 && username.length <= 8 ? 'border-green' : 'border-red'}`}
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
          <div className="text-align-center">
            <button type="button" className="text-align-center border-radius-10 padding-10 background-dark-three button-random color-white" onClick={connectAsGuest}>
              Connect as Guest
            </button>
          </div>
        </div>
        <div className="background-white margin-20 border-radius-20 padding-30 padding-bottom-20 border-dark-one width-200px secondary">
          <a href="https://discord.gg/dxHhmVv" target="_blank" rel="noopener noreferrer" className="flex-row color-dark-two">
            <img src="/Discord-Logo-Color.svg" alt="Discord" width="50" height="50" />
            <p>Join Discord</p>
          </a>
        </div>
      </div>


      <div className="background-white margin-20 border-radius-20 text-align-center border-dark-one">
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

      <div className="footer color-white flex-row align-center justify-space-between width-100">
        <a
          style={{
            backgroundColor: 'black', color: 'white', textDecoration: 'none', padding: '4px 6px', fontFamily: '-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif', fontSize: '12px', fontWeight: 'bold', lineHeight: 1.2, display: 'inline-block', borderRadius: '3px',
          }}
          href="https://unsplash.com/@amandagraphc?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from Amanda Jones"
        >
          <span style={{ display: 'inline-block', padding: '2px 3px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: '12px', width: 'auto', position: 'relative', verticalAlign: 'middle', top: '2px', fill: 'white',
              }}
              viewBox="0 0 32 32"
            >
              <p>unsplash-logo</p>
              <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
            </svg>
          </span>
          <span style={{ display: 'inline-block', padding: '2px 3px' }}>Image By: Amanda Jones</span>
        </a>
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
            background-image: url(splash.jpeg);
            background-size: cover;
            background-repeat: no-repeat;
            width: 100vw;
            height: 100vh;
            overflow-y: auto;
          }
          .footer {
            position: absolute;
            bottom: 0px;
          }
          .button-random:hover {
            background-color: ${variables.dark_two_color};
          }

          @media only screen and (max-width: 600px) {
              .page {
                height: 100%;
              }
              .mobile {
                flex-direction: column !important;
              }
              .main {
                order: 0;
              }
              .secondary {
                order: 1;
              }
              .footer {
                position: relative;
              }
          }
        `}
      </style>
    </div>
  );
};

export default withRedux(Index);
