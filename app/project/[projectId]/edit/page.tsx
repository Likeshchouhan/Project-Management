"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

export default function EditProjectPage() {
  const [name, setName] = useState("")
  const router = useRouter()
  const params = useParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch("/api/project", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: params.projectId,
        name,
      }),
    })

    if (res.ok) {
      router.push("/dashboard")
    } else {
      alert("Update failed")
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New name"
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Update
        </button>
      </form>
    </div>
  )
}