import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

const schema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(8, { message: "Username must be between 8 and 16 characters" })
    .max(16, { message: "Username must be between 8 and 16 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be between 8 and 16 characters" })
    .max(16, { message: "Password must be between 8 and 16 characters" }),
  name: z.string().min(1, { message: "Please enter your name" }),
  dob: z
    .date()
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18))),
  phone: z.number().int(),
  address: z.string(),
  email: z.string().email(),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: any) {
    try {
      const res = await axios.post("api/users/create", data);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 max-w-xl mx-auto"
      >
        <input type="text" {...register("username")} placeholder="Username" />
        {errors.username?.message && (
          <p>{errors.username?.message.toString()}</p>
        )}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password?.message && (
          <p>{errors.password?.message.toString()}</p>
        )}
        <input type="text" {...register("name")} placeholder="Name" />
        {errors.name?.message && <p>{errors.name.message.toString()}</p>}
        <input
          type="date"
          {...register("dob", { valueAsDate: true })}
          max={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .split("T")[0]
          }
        />
        {errors.dob?.message && <p>{errors.dob.message.toString()}</p>}
        <input
          type="number"
          {...register("phone", { valueAsNumber: true })}
          placeholder="Phone number"
        />
        {errors.phone?.message && <p>{errors.phone?.message?.toString()}</p>}
        <input type="text" {...register("address")} placeholder="Address" />
        {errors.address?.message && <p>{errors.address.message.toString()}</p>}
        <input type="email" {...register("email")} placeholder="Email" />
        {errors.email?.message && <p>{errors.email.message.toString()}</p>}
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}
