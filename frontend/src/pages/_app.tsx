import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import ScheduleContextProvider from "@/contexts/scheduleContextProvider";
import UserContextProvider from "@/contexts/userContextProvider";
import TaskOperationContextProvider from "@/contexts/taskOperationContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ISKOduler</title>
      </Head>
      <UserContextProvider>
        <ScheduleContextProvider>
          <TaskOperationContextProvider>
            <Component {...pageProps} />
          </TaskOperationContextProvider>
        </ScheduleContextProvider>
      </UserContextProvider>
    </>
  );
}
