import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { Booking, Room } from "@prisma/client";
import Head from "next/head";

type ShowBooking = Booking & {
  room: Room;
};

export default function AllBooking({ bookings }: { bookings: ShowBooking[] }) {
  return (
    <div className="grid grid-cols-2 max-w-2xl mx-auto gap-2">
      <Head>
        <title key="title">All bookings</title>
      </Head>
      {bookings.map(booking => {
        return (
          <div key={booking.id} className="bg-gray-400 p-2 rounded-md">
            <div>Customer name: {booking.customer_name}</div>
            <div>Room name: {booking.room.name}</div>
            <div>Total cost: ${booking.total_cost}</div>
            <div>From: {new Date(booking.start_date).toLocaleDateString()}</div>
            <div>To: {new Date(booking.end_date).toLocaleDateString()}</div>
          </div>
        );
      })}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const bookings = JSON.parse(
    JSON.stringify(
      await prisma.booking.findMany({
        where: {},
        include: {
          room: true,
        },
      })
    )
  );
  return { props: { bookings } };
};
