"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewProjectPage() {
  const [name, setName] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })

    router.push("/dashboard")
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Create New Project</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  )
}