import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between bg-black text-white h-12 items-center px-8 mb-4">
      <div>Logos</div>
      <div className="flex gap-4">
        {session?.user ? (
          <>
            <Link href="/profile">{session.user.name}</Link>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <>
            <Link href="/signup">Sign Up</Link>
            <button onClick={() => signIn()}>Sign In</button>
          </>
        )}
      </div>
    </nav>
  );
}
