import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Something went wrong" });
  console.log({ id });
  try {
    await prisma.room.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).redirect("/rooms");
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
}
