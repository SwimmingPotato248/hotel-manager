import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import React from "react";
import prisma from "../lib/prisma";
import { authOptions } from "./api/auth/[...nextauth]";

interface Props {
  user: {
    username: string;
    profile: {
      address: string;
      dob: string;
      email: string;
      name: string;
      phone: number;
      userId: number;
    };
  };
}

export default function Profile({ user }: Props) {
  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-2">
      <Head>
        <title key="title">Profile</title>
      </Head>
      <div>Profile {user.username}</div>
      <div>Name: {user.profile.name}</div>
      <div>DOB: {new Date(user.profile.dob).toLocaleDateString()}</div>
      <div>Address: {user.profile.address}</div>
      <div>Phone: {user.profile.phone}</div>
      <div>Email: {user.profile.email}</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !session.user?.name) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = JSON.parse(
    JSON.stringify(
      await prisma.user.findUnique({
        where: { username: session.user.name },
        select: {
          username: true,
          profile: true,
        },
      })
    )
  );

  return {
    props: {
      user,
    },
  };
};
