import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import { Status, Room } from "@prisma/client";
import Head from "next/head";

const EditRoom = ({ room }: { room: Room }) => {
  return (
    <>
      <Head>
        <title key="title">Edit room {room.name}</title>
      </Head>
      <form
        className="flex flex-col gap-2 mx-auto max-w-xl"
        method="POST"
        action="/api/rooms/edit"
      >
        <input type="hidden" name="id" value={room.id} />
        <input type="text" name="name" defaultValue={room.name} required />
        <input type="number" name="price" defaultValue={room.price} required />
        <select name="status">
          {Object.keys(Status).map(status => {
            return (
              <option key={status} value={status}>
                {status}
              </option>
            );
          })}
        </select>
        <input
          type="submit"
          value="Edit this room"
          className="bg-blue-400 rounded-md py-2 cursor-pointer"
        />
      </form>
      <div className="mx-auto text-center my-4">-Or-</div>
      <form
        className="flex flex-col gap-2 mx-auto max-w-xl"
        method="POST"
        action="/api/rooms/delete"
      >
        <input type="hidden" name="id" value={room.id} />
        <input
          type="submit"
          value="Delete this room"
          className="bg-blue-400 rounded-md py-2 cursor-pointer"
        />
      </form>
    </>
  );
};

export default EditRoom;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const { id } = params;
  if (typeof id !== "string") return { notFound: true };
  const room = await prisma.room.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!room) return { notFound: true };
  return { props: { room } };
};
