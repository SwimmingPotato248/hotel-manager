import { GetServerSideProps, NextPage } from "next";
import prisma from "../../../lib/prisma";

type Room = {
  room: {
    id: number;
    name: string;
    price: number;
    status: string;
  };
};

const EditRoom: NextPage<Room> = ({ room }) => {
  return (
    <form
      className="flex flex-col gap-2 mx-auto max-w-xl"
      method="POST"
      action="/api/rooms/edit"
    >
      <input type="hidden" name="id" value={room.id} />
      <input type="text" name="name" defaultValue={room.name} />
      <input type="number" name="price" defaultValue={room.price} />
      <select name="status">
        <option value="AVAILABLE">Available</option>
        <option value="NOT_AVAILABLE">Not Available</option>
        <option value="MAINTENANCE">Maintenance</option>
      </select>
      <input
        type="submit"
        value="Edit this room"
        className="bg-blue-400 rounded-md py-2 cursor-pointer"
      />
    </form>
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
  if (!id) return { notFound: true };
  const room = await prisma.room.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!room) return { notFound: true };
  return { props: { room } };
};
