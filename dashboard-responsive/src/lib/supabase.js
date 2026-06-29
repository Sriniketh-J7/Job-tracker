import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config.js";

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const base = () => `${SUPABASE_URL}/rest/v1/applications`;

export async function fetchApplications() {
  const res = await fetch(`${base()}?select=*&order=created_at.desc`, { headers });
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function addApplication(payload) {
  const res = await fetch(base(), {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateApplication(id, payload) {
  const res = await fetch(`${base()}?id=eq.${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteApplication(id) {
  const res = await fetch(`${base()}?id=eq.${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error(await res.text());
}
