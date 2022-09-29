import { Switch } from "@mui/material";
import { Room, Status } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import prisma from "../../lib/prisma";

export default function Rooms({ rooms }: { rooms: Room[] }) {
  const [filtered, setFiltered] = useState(false);
  return (
    <div className="mx-auto max-w-2xl flex flex-col justify-center gap-2">
      <div className="text-center text-5xl text-rose-600">Rooms</div>
      <Link href="/rooms/create">
        <button className="w-full bg-blue-500 my-4 py-2 rounded-xl shadow-md shadow-black focus:shadow-sm">
          Add new room
        </button>
      </Link>
      <div className="mx-auto">
        <label>
          <Switch
            onChange={e => {
              setFiltered(e.target.checked);
            }}
          />{" "}
          Toggle available
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {rooms
          .filter(room => (filtered ? room.status === Status.AVAILABLE : true))
          .map((room: any) => {
            return (
              <div
                key={room.id}
                className="bg-slate-300 rounded-lg p-4 flex flex-col gap-2 shadow-black shadow-lg"
              >
                <Head>
                  <title key="title">Rooms</title>
                </Head>
                <div>Room name: {room.name}</div>
                <div>Price: {room.price}</div>
                <div>Status: {room.status}</div>
                {room.status === "AVAILABLE" && (
                  <Link href={`/bookings?roomId=${room.id}`}>
                    <div className="bg-blue-400 text-center rounded-md cursor-pointer">
                      Check-in this room
                    </div>
                  </Link>
                )}
                <Link href={`/rooms/${room.id}/edit`}>
                  <div className="bg-blue-400 text-center rounded-md cursor-pointer">
                    Edit this room
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const rooms = await prisma.room.findMany({ orderBy: { id: "desc" } });
  return {
    props: {
      rooms,
    },
  };
};
