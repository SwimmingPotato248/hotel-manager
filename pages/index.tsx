import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Head>
        <title key="title">Homepage</title>
      </Head>
      <div className="flex gap-4">
        <Link href="/rooms">
          <button className="h-80 w-80 p-8 bg-neutral-400 rounded-2xl shadow-lg shadow-black focus:shadow-sm text-2xl">
            See all rooms
          </button>
        </Link>
        <Link href="/bookings/all">
          <button className="h-80 w-80 p-8 bg-neutral-400 rounded-2xl shadow-lg shadow-black focus:shadow-sm text-2xl">
            See all check-in history
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
