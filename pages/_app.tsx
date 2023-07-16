// i18n
import "../locales/i18n";
import "../src/style.css";
import Head from "next/head";
import App, { AppProps, AppContext } from "next/app";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SettingsProvider } from "../src/context/SettingsContext";
import { SettingsValueProps } from "../src/components/settings/type";
import cookie from "cookie";
import { getSettings } from "../src/utils/getSettings";
import ThemeSettings from "../src/components/settings";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  settings: SettingsValueProps;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    settings,
  } = props;
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SettingsProvider defaultSettings={settings}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeSettings>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            {getLayout(<Component {...pageProps} />)}
          </ThemeSettings>
        </ThemeProvider>
      </SettingsProvider>
    </CacheProvider>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || "" : document.cookie
  );

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
  };
};
