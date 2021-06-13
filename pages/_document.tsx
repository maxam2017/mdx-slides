/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  // prettier-ignore
  render = () => {
    return (
      <Html>
        <Head>
          <meta name="description" content="Let's get started"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <meta name='theme-color' content='#ffffff' />
          <link rel="manifest" href="/manifest.json"/>
          <script dangerouslySetInnerHTML={{ __html: '"dark"===localStorage.theme||!("theme"in localStorage)&&window.matchMedia("(prefers-color-scheme: dark)").matches?(document.documentElement.classList.add("dark"),localStorage.theme="dark"):(document.documentElement.classList.remove("dark"),localStorage.theme="light");' }}/>
        </Head>
        <body className="bg-white dark:bg-gray-800">
          <Main />
          <NextScript />
          <div id="🦄️" />
        </body>
      </Html>
    );
  };
}
