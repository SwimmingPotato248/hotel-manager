import { NextApiRequest, NextApiResponse } from "next";
import * as argon2 from "argon2";
import prisma from "../../../lib/prisma";
import { signIn } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  const { username, password, name, dob, phone, address, email } = req.body;
  const hash = await argon2.hash(password);
  try {
    await prisma.user.create({
      data: {
        username,
        password: hash,
        profile: {
          create: {
            name,
            dob,
            phone,
            address,
            email,
          },
        },
      },
    });
    res.status(200).json({
      ok: true,
      message: "User successfully created",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
}
