"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ username }),
    })
    router.push("/dashboard")
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <input
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleLogin} className="ml-2 bg-black text-white px-4 py-2">
          Login
        </button>
      </div>
    </div>
  )
}