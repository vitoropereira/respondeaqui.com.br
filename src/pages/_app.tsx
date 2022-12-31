import { AnimateSharedLayout } from "framer-motion";
import Head from "next/head";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "../context/ThemeContextProvider";
import { Session } from "next-auth";
import NextNProgress from "src/components/ProgressBar";
import { SWRConfig } from "swr";

import "../styles/globals.css";
import { DefaultHead } from "src/components/DefaultHeader";
// import "../styles/styles.css";

async function SWRFetcher(resource, init) {
  const response = await fetch(resource, init);
  const responseBody = await response.json();

  return responseBody;
}

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <DefaultHead />
      <SWRConfig
        value={{
          fetcher: SWRFetcher,
        }}
      >
        <ThemeContextProvider>
          <AnimateSharedLayout>
            <NextNProgress />
            <Component {...pageProps} />
          </AnimateSharedLayout>
        </ThemeContextProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
