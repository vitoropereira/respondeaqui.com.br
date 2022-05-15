import { AnimateSharedLayout } from "framer-motion";
import { AppProps } from "next/app";
import Layout from "../components/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimateSharedLayout>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimateSharedLayout>
  );
}

export default MyApp;
