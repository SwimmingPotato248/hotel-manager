import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div>Homepage</div>
      <div>
        <Link href="/rooms">
          <button className="h-60 w-60 p-8 bg-neutral-400 rounded-2xl">
            See all rooms
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
