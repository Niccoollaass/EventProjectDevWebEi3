import type {AppEvent} from "../utils/types"

export async function createEvent(
  name: string,
  event_date: string,
  description: string,
  peopleMax: number
): Promise<void> {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/events", {
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

export async function fetchEvents() {
  const res = await fetch("/api/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return await res.json();
}
export async function deleteEvent(id:number) {
  const token = localStorage.getItem("token");

  const res = await fetch(`/api/events/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
     },
  });
  if (res.status === 204) return;

  if (!res.ok) {
    const raw = await res.text(); 

    throw new Error("Failed to fetch events");
  }

  return await res.json();
}

export async function modifyEvent(id:number,
  name: string,
  event_date: string,
  description: string,
  people_max: number) {
  const token = localStorage.getItem("token");

  const res = await fetch(`/api/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, event_date, description, people_max }),
  });

  if (!res.ok) {
    let msg = "Failed to modify event";
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch {}
    throw new Error(msg);
  }
}

//   return await res.json(); // event modifié (RETURNING *)
// }

export async function registerEvent(id: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api/events/${id}/register`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("register failed");
}
export async function unRegisterEvent(id: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api/events/${id}/register`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("register failed");
}


export async function fetchMyRegistrations(): Promise<number[]> {
  const token = localStorage.getItem("token");
  if (!token) return [];

  const res = await fetch("/api/me/registrations", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return []; // si pas connecté / token invalide => aucune inscription

  const rows = (await res.json()) as { event_id: number }[];
  return rows.map((r) => r.event_id);
}

// export async function getpartipantsEvent() {
// }
