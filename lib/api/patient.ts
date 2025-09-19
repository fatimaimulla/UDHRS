const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getPrescriptions(token: string) {
  const res = await fetch(`${API_BASE}/auth/prescriptions`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch prescriptions");
  }

  return res.json();
}

