import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import prisma from "../../lib/prisma";

export default function Rooms({ rooms }: any) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">Rooms</div>
      <Link href="/rooms/create">
        <button className="w-full bg-blue-500 my-4 py-2 rounded-xl">
          Add new room
        </button>
      </Link>
      <div className="grid grid-cols-2 gap-2">
        {rooms.map((room: any) => {
          return (
            <div
              key={room.id}
              className="bg-slate-300 rounded-lg p-4 flex flex-col gap-2"
            >
              <div>Room name: {room.name}</div>
              <div>Price: {room.price}</div>
              <div>Status: {room.status}</div>
              {room.status === "AVAILABLE" && (
                <Link
                  href={`/bookings?roomId=${room.id}&roomName=${room.name}`}
                >
                  <div className="bg-blue-400 text-center rounded-md cursor-pointer">
                    Book this room
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
  const rooms = await prisma.room.findMany({});
  return {
    props: {
      rooms,
    },
  };
};
