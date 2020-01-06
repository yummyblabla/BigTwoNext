/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import withRedux from '../redux/redux';
import { setUsername, setSocket } from '../redux/actionCreators';

import IndexErrorModal from '../components/Modals/IndexErrorModal';


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
      <div className="loginContainer">
        <form>
          <p className="title">
            Play BigTwo
          </p>
          <br />
          <label htmlFor="username">
            Choose a unique Username!
            <br />
            <input autoFocus className="usernameInput" id="username" type="text" value={username} onChange={(e) => set$Username(e.target.value)} placeholder="Username" />
          </label>
          <br />
          <input className="submit" type="submit" value="Connect" onClick={connect} />
        </form>
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
            background-color: #CDCDCD;
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
            background-color: #ffffff;
            margin: 20px;
            border-radius: 10px;
          }

          form {
            text-align: center;
            margin: 20px;
          }

          form .title {
            font-size: 2rem;
            margin-bottom: 0;
          }

          .usernameInput {
            margin-top: 5px;
          }

          .submit {
            margin-top: 20px;
            padding: 10px;
            border: none;
            border-radius: 10px;
            background-color: #20d420;
            width: 90%;
            cursor: pointer;
          }

          .submit:hover {
            background-color: #19a119;
          }
        `}
      </style>
    </div>
  );
};

export default withRedux(Index);
