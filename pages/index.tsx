import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return <div>Homepage</div>;
};

export default Home;
