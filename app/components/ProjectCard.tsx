"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProjectCard({ project }: any) {
  const router = useRouter()

  async function handleDelete() {
    await fetch("/api/project", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: project.id }),
    })

    router.refresh()
  }

  return (
    <div style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
      <h3>{project.name}</h3>
      <Link href={`/project/${project.id}`}>
        <button>Open</button>
      </Link>
      <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
        Delete
      </button>

      <Link href={`/project/${project.id}/edit`}>
        <button style={{ marginLeft: "10px" }}>Edit</button>
      </Link>
    </div>
  )
}