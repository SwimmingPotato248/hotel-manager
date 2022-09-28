import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Head>
        <title key="title">Homepage</title>
      </Head>
      <div>Homepage</div>
      <div className="flex gap-4">
        <Link href="/rooms">
          <button className="h-60 w-60 p-8 bg-neutral-400 rounded-2xl shadow-lg shadow-black focus:shadow-sm">
            See all rooms
          </button>
        </Link>
        <Link href="/bookings/all">
          <button className="h-60 w-60 p-8 bg-neutral-400 rounded-2xl shadow-lg shadow-black focus:shadow-sm">
            See all bookings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
