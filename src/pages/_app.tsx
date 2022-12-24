import { AnimateSharedLayout } from "framer-motion";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "../context/ThemeContextProvider";
import { Session } from "next-auth";
import NextNProgress from "src/components/ProgressBar";
import { SWRConfig } from "swr";

import "../styles/globals.css";
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
    <SWRConfig
      value={{
        fetcher: SWRFetcher,
      }}
    >
      <SessionProvider session={pageProps.session}>
        <ThemeContextProvider>
          <AnimateSharedLayout>
            <NextNProgress />
            <Component {...pageProps} />
          </AnimateSharedLayout>
        </ThemeContextProvider>
      </SessionProvider>
    </SWRConfig>
  );
}

export default MyApp;
