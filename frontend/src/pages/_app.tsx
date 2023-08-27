import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import ScheduleContextProvider from "@/contexts/scheduleContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ISKOduler</title>
      </Head>
      <ScheduleContextProvider>
        <Component {...pageProps} />
      </ScheduleContextProvider>
    </>
  );
}
