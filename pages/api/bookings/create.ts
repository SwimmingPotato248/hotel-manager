import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Status } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    res.status(405).json({ message: "Method not allowed" });
  const { roomId, username, customer_name, end_date, cost } =
    req.body;
  try {
    await prisma.booking.create({
      data: {
        customer_name,
        end_date: new Date(end_date),
        total_cost: parseInt(cost),
        room: { connect: { id: parseInt(roomId) } },
        user: { connect: { username: username } },
      },
    });
    await prisma.room.update({
      where: { id: parseInt(roomId) },
      data: {
        status: Status.NOT_AVAILABLE,
      },
    });
    res.status(200).redirect("/rooms");
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
}
