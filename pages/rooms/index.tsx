import { Switch } from "@mui/material";
import { Room, Status } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import prisma from "@/lib/prisma";
import axios from "axios";

export default function Rooms(props: { rooms: Room[] }) {
  const [rooms, setRooms] = useState(props.rooms);
  const [filtered, setFiltered] = useState(false);

  async function handleCheckout(id: number) {
    const room = rooms.find(room => room.id === id);
    try {
      await axios.post("/api/rooms/edit", {
        ...room,
        status: Status.AVAILABLE,
      });
      setRooms(
        rooms.map(room => {
          if (room.id === id) return { ...room, status: Status.AVAILABLE };
          return room;
        })
      );
    } catch (e) {
      console.log(e);
    }
  }
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
          .map(room => {
            return (
              <div
                key={room.id}
                className="bg-slate-300 rounded-lg p-4 flex flex-col gap-2 shadow-black shadow-lg"
              >
                <Head>
                  <title key="title">Rooms</title>
                </Head>
                <div>Room name: {room.name}</div>
                <div>Price: ${room.price}</div>
                <div>Status: {room.status}</div>
                {room.status === Status.AVAILABLE && (
                  <Link href={`/bookings?roomId=${room.id}`}>
                    <div className="bg-blue-400 text-center rounded-md cursor-pointer">
                      Check-in this room
                    </div>
                  </Link>
                )}
                {room.status === Status.NOT_AVAILABLE && (
                  <button
                    className="bg-blue-400 text-center rounded-md cursor-pointer"
                    onClick={() => handleCheckout(room.id)}
                  >
                    Check out this room
                  </button>
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
