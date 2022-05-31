import Router from 'next/router';
import nProgress from 'nprogress';
import React from 'react';
import '../styles/globals.scss';
import '../styles/nprogress.css';
import Layout from '../components/Layout';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Layout><Component {...pageProps} /></Layout>
    </>
  )
}

export default MyApp;
