import Head from 'next/head';
import Link from 'next/link';

const About = () => {
  return (
    <div>
      <Head>
        <title>BigTwo.io | About</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="BigTwo HTML5 Card Game with Socket.io" />
        <meta name="keywords" content="BigTwo,Big2,Big Two,IO,Cards,Game,Canvas,WebGL,PixiJS,HTML5,Socket.io,PlayBigTwo,Play BigTwo,Play Big Two,Multiplayer,Card Game,Asian,Chinese,Vietnamese" />
        <meta name="author" content="Derrick Lee" />
        <link rel="icon" type="image/png" href="favicon.ico" />
        <link rel="apple-touch-icon" href="favicon.ico" />
      </Head>
      <h1 className="text-align-center color-dark-four margin-top-30">
        About Me
      </h1>
      <div className="text-align-center color-dark-four">
        <p>Hello! I&apos;m currently a developer.</p>
        <p>
          {'You can contact me on '}
          <a
            className="color-dark-three"
            href="https://www.linkedin.com/in/derricklee91/"
          >
            LinkedIn
          </a>
        </p>
        <p>
          {'Or visit my website '}
          <a
            className="color-dark-three"
            href="https://derricklee.dev"
          >
            here
          </a>
        </p>
      </div>

      <div className="link margin-top-5 padding-top-0">
        <Link href="/">
          <a className="color-dark-four">
            Back to Main Page
          </a>
        </Link>
      </div>

      <style jsx>
        {`
          .link {
            position: absolute;
            top: 0px;
          }
        `}
      </style>
    </div>
  );
};

export default About;
