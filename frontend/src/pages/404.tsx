import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3 w-full">
      <h1 className="font-body text-6xl md:text-7xl font-extrabold text-center ">
        404
      </h1>
      <p className="text-xl md:text-2xl text-center w-10/12 font-medium">
        Oops, this page does not exist
      </p>
      <Link
        href={"/schedules"}
        className="bg-primary text-white text-xl max-w-xs
        w-10/12 rounded-full py-3 mt-3 font-bold"
      >
        <button className="text-center w-full">Go back</button>
      </Link>
    </div>
  );
}
