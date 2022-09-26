import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

export default function CreateRoom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: any) {
    console.log(data);
    try {
      const res = await axios.post(
        `${window.location.origin}/api/rooms/create`,
        data
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form
      className="flex flex-col max-w-xl mx-auto gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        placeholder="Room name"
        {...register("name", { required: true })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        {...register("price", { required: true, valueAsNumber: true })}
        required
        step="0.01"
        min="0"
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
