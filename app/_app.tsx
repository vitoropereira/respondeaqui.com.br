import { AnimateSharedLayout } from "framer-motion";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "../context/ThemeContextProvider";
import { Session } from "next-auth";
import { SWRConfig } from "swr";

import { DefaultHead } from "src/components/DefaultHeader";
import NextNProgress from "src/components/ProgressBar";

import "../styles/globals.css";

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
