import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  console.log(req.body);

  const { id, name, price, status } = req.body;
  try {
    await prisma.room.update({
      where: { id: parseInt(id) },
      data: {
        name,
        price: parseInt(price),
        status,
      },
    });
    res.status(200).redirect("/rooms");
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
}
