import Layout from "@/components/Layout";
// import "@/styles/globals.css";
import GlobalStyle from "@/styles/global-styleds";
import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot, useRecoilValue } from "recoil";
import { useState } from "react";

import { isDarkAtom } from "@/atoms";
import { darkTheme, lightTheme } from "@/theme";
// import { isDarkAtom } from "./atoms";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    // themeProvider 안에 있는 페이지들은 모두 theme으로 접근이 가능하다
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <GlobalStyle />
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
