import type { AppProps } from 'next/app';

import '~/styles/globals.css';
import Head from 'next/head';
import Header from '~/components/view/Header';
import ThemeProvider from '~/context/ThemeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to MDX Slides</title>
      </Head>
      <ThemeProvider>
        <div className="fixed w-full h-full flex flex-col">
          <Header />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
