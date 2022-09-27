import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Booking() {
  const router = useRouter();
  const { roomId } = router.query;
  const { handleSubmit, register } = useForm();

  return (
    <form>
      <h1>Booking for room {roomId}</h1>
    </form>
  );
}
