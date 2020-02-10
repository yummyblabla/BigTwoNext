import Head from 'next/head';
import Link from 'next/link';

const About = () => {
  return (
    <div>
      <Head>
        <title>BigTwo.io | About the Developer</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="BigTwo HTML5 Card Game with Socket.io. Made by Derrick Lee, a developer in Vancouver BC. Check out his other content in his website or LinkedIn" />
        <meta name="keywords" content="BigTwo,Big2,Big Two,IO,Cards,Game,Canvas,WebGL,PixiJS,HTML5,Socket.io,PlayBigTwo,Play BigTwo,Play Big Two,Multiplayer,Card Game,Asian,Chinese,Vietnamese" />
        <meta name="author" content="Derrick Lee" />
        <meta name="language" content="en" />
        <link rel="icon" type="image/png" href="favicon.ico" />
        <link rel="apple-touch-icon" href="favicon.ico" />
        <link rel="canonical" href="https://bigtwo.io/about" />
      </Head>
      <h1 className="text-align-center color-dark-four margin-top-30">
        About Me
      </h1>
      <div className="text-align-center color-dark-four">
        <img src="profile.jpeg" className="border-radius-30" alt="Profile" />
        <p>Hello! I am currently a developer in Vancouver and aspiring to become a programming wizard.</p>
        <p>This is my side project where I create BigTwo as a web game for everybody to enjoy as well as where I learn about all the small details of web development.</p>
        <p>I am constantly updating and adding new features so that all aspects of BigTwo can be enjoyed fully, whether you are a beginner or a veteran.</p>
        <br />
        <p>
          {'For inquiries or contact information, you can find me on '}
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
          .
        </p>
      </div>

      <div className="back-link">
        <Link href="/">
          <a href="/">
            <button type="button" className="margin-5 border-radius-10 border-dark-two color-dark-one background-white padding-5">Back to Main Page</button>
          </a>
        </Link>
      </div>

      <style jsx>
        {`
          .back-link {
            position: absolute;
            top: 0px;
          }
          img {
            width: 200px;
            height: 200px;
          }
        `}
      </style>
    </div>
  );
};

export default About;
