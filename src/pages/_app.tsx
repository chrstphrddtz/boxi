import GlobalStyle from "../styles/styles";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import Layout from "../../components/Navbar/Layout";

import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args: [string]) => {
          let newarg = args[0];
          const response = await fetch(newarg);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <UserProvider>
        <Layout>
          <GlobalStyle />

          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </SWRConfig>
  );
}
