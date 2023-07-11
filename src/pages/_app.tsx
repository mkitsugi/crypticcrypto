import "../styles/globals.css";
import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../styles/theme";



function App({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
