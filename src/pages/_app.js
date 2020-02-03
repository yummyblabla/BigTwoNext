/* eslint-disable */
import '../styles.scss';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps}>
      <Head>
        <title>BigTwo.io</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
        {/* <meta charset="UTF-8" /> */}
        <meta name="description" content="BigTwo HTML5 Card Game with Socket.io" />
        <meta name="keywords" content="BigTwo,Big2,Big Two,IO,Cards,Game,PixiJS,HTML5,Socket.io" />
        <meta name="author" content="Derrick Lee" />
        <link rel="icon" type="image/png" href="/static/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
      </Head>
    </Component>
  );
}

export default MyApp;
