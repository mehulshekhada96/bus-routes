import '../styles/globals.css';
import Layout from '../components/Layout';
import { useState } from 'react';
function MyApp({ Component, pageProps }) {
  const [selectedBus, setSelectedBus] = useState({});
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
