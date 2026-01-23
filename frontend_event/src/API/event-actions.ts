import type {Event} from "../utils/types"

export async function createEvent(
  name: string,
  event_date: string,
  description: string,
  peopleMax: number
): Promise<void> {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/createevent", {
    method: "POST",
    headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
     },
    body: JSON.stringify({
      name,
      event_date,
      description,
      people_max: peopleMax
    }),
  });

  if (!res.ok) {
  const raw = await res.text(); 
  console.log("CREATEEVENT status =", res.status);
  console.log("CREATEEVENT raw response =", raw);
  throw new Error(raw || `HTTP ${res.status}`);
}
}

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch("/api/fetchevents");
  if (!res.ok) throw new Error("Cannot fetch events");
  return res.json();
}