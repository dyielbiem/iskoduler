import RestrictedHeader from "../components/restrictedHeader";
import SignInForm from "@/components/signInForm";
import { getSchedules } from "@/utils/requests";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   getSchedules();
  // }, []);

  return (
    <>
      <RestrictedHeader />
      <main className="flex flex-col w-full min-h-screen">
        <SignInForm />
      </main>
    </>
  );
}
