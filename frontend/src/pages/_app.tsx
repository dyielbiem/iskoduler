import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import ScheduleContextProvider from "@/contexts/scheduleContextProvider";
import UserContextProvider from "@/contexts/userContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ISKOduler</title>
      </Head>
      <UserContextProvider>
        <ScheduleContextProvider>
          <Component {...pageProps} />
        </ScheduleContextProvider>
      </UserContextProvider>
    </>
  );
}
