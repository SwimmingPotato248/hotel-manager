import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Booking() {
  const router = useRouter();
  const { roomId, roomName } = router.query;
  const [endDateMin, setEndDateMin] = useState(
    new Date().toISOString().split("T")[0]
  );
  const endDateRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  return (
    <form
      className="max-w-xl mx-auto flex flex-col gap-2"
      method="POST"
      action="/api/bookings/create"
    >
      <h1>Booking for room {roomName}</h1>
      <input type="hidden" name="roomId" value={roomId} />
      <input type="hidden" name="username" value={session?.user?.name || ""} />
      <label htmlFor="customer">Customer Name</label>
      <input
        type="text"
        id="customer"
        placeholder="Customer Name"
        name="customer_name"
      />
      <label htmlFor="start">Start Date</label>
      <input
        id="start"
        type="date"
        name="start_date"
        min={new Date().toISOString().split("T")[0]}
        onChange={e => {
          setEndDateMin(e.target.value);
          if (endDateRef.current)
            if (endDateRef.current.value < e.target.value) {
              endDateRef.current.value = e.target.value;
            }
        }}
      />
      <label htmlFor="end">End Date</label>
      <input
        type="date"
        id="end"
        name="end_date"
        min={endDateMin}
        ref={endDateRef}
      />
      <label htmlFor="cost">Total cost</label>
      <input type="number" min="0" step="0.01" id="cost" name="cost" />
      <input type="submit" value="Book" />
    </form>
  );
}
