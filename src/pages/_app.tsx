import { AnimateSharedLayout } from "framer-motion";
import { AppProps } from "next/app";
import { AuthUserContextProvider } from "../context/AuthUserContextProvider";
import { ThemeContextProvider } from "../context/ThemeContextProvider";

import "../styles/globals.css";
import "../styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserContextProvider>
      <ThemeContextProvider>
        <AnimateSharedLayout>
          <Component {...pageProps} />
        </AnimateSharedLayout>
      </ThemeContextProvider>
    </AuthUserContextProvider>
  );
}

export default MyApp;
