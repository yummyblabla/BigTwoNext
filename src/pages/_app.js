/* eslint-disable */
import '../styles.scss';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps}>
      <Head>
        <title>BigTwo.io</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
      </Head>
    </Component>
  );
}

export default MyApp;
