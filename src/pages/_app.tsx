import { AnimateSharedLayout } from "framer-motion";
import { AppProps } from "next/app";
import { AuthUserContextProvider } from "../context/AuthUserContextProvider";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserContextProvider>
      {/* <ThemeProvider     <GlobalStyled />  theme={isDarkTheme ? lightTheme : darkTheme}> */}
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
      {/* </ThemeProvider> */}
    </AuthUserContextProvider>
  );
}

export default MyApp;
