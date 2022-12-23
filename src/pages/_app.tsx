import { AnimateSharedLayout } from "framer-motion";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthUserContextProvider } from "../context/AuthUserContextProvider";
import { ThemeContextProvider } from "../context/ThemeContextProvider";

import "../styles/globals.css";
import "../styles/styles.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthUserContextProvider>
        <ThemeContextProvider>
          <AnimateSharedLayout>
            <Component {...pageProps} />
          </AnimateSharedLayout>
        </ThemeContextProvider>
      </AuthUserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
