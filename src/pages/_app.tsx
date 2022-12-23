import { AnimateSharedLayout } from "framer-motion";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "../context/ThemeContextProvider";
import { Session } from "next-auth";

import "../styles/globals.css";
import "../styles/styles.css";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeContextProvider>
        <AnimateSharedLayout>
          <Component {...pageProps} />
        </AnimateSharedLayout>
      </ThemeContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
