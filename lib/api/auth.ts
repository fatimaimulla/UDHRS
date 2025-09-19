const API_BASE = process.env.NEXT_PUBLIC_API_URL 

export async function login(userId: string, role: "doctor" | "patient")
{
    
   
  const res = await fetch(`${API_BASE}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    
    body: JSON.stringify({ "abhaId":userId,"nmcId":userId, role }),
  })

  if (!res.ok) throw new Error("Login failed")

  return res.json()
}

export async function verifyToken(token: string) {
  const res = await fetch(`${API_BASE}/auth/verify`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}
