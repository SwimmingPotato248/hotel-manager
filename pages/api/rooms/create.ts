import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Methos not allowed" });
  const { name, price } = req.body;
  try {
    const room = await prisma.room.create({
      data: {
        name,
        price,
      },
    });
    res.status(200).json({ ok: true, message: "Room created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
}
