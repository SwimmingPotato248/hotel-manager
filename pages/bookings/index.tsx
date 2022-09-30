import { Room, Status } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRef, useState } from "react";
import prisma from "../../lib/prisma";

export default function Booking({ room }: { room: Room }) {
  const [cost, setCost] = useState(0);
  const { data: session } = useSession();

  return (
    <form
      className="max-w-xl mx-auto flex flex-col gap-2"
      method="POST"
      action="/api/bookings/create"
    >
      <Head>
        <title key="title">Book room</title>
      </Head>
      <h1 className="font-bold text-lg">Check-in for room {room.name}</h1>
      <input type="hidden" name="roomId" value={room.id} />
      <input type="hidden" name="username" value={session?.user?.name || ""} />
      <label htmlFor="customer">Customer Name</label>
      <input
        type="text"
        id="customer"
        placeholder="Customer Name"
        name="customer_name"
        required
      />
      <label htmlFor="end">End Date</label>
      <input
        type="date"
        id="end"
        name="end_date"
        min={
          new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]
        }
        onChange={e => {
          setCost(
            room.price *
              Math.ceil(
                (new Date(e.target.value).getTime() - new Date().getTime()) /
                  (24 * 60 * 60 * 1000)
              )
          );
        }}
        required
      />
      <label htmlFor="cost">Total cost</label>
      <input
        type="number"
        min="0"
        step="0.01"
        readOnly={true}
        id="cost"
        name="cost"
        value={cost}
      />
      <input
        type="submit"
        value="Book"
        className="bg-blue-400 py-2 rounded-lg mt-2"
      />
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query) return { notFound: true };
  const { roomId } = query;
  if (!roomId) return { notFound: true };
  if (typeof roomId !== "string") return { notFound: true };
  const room = await prisma.room.findUnique({
    where: { id: parseInt(roomId) },
    select: { price: true, status: true, name: true, id: true },
  });
  if (room?.status !== Status.AVAILABLE)
    return { redirect: { destination: "/rooms", permanent: false } };
  return { props: { room } };
};
