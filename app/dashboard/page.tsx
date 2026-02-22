import { prisma } from "../lib/prisma"
import { getCurrentUser } from "../lib/session"
import { redirect } from "next/navigation"
import Link from "next/link"
import ProjectCard from "../components/ProjectCard"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div style={{ padding: "20px" }}>

       <form action="/api/logout" method="POST">
        <button style={{ float: "right" }}>Logout</button>
      </form>
      <h1>Dashboard</h1>
      <p>Welcome {user.username}</p>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Link href="/project/new">
          <button style={{ padding: "8px 16px" }}>
            + Create Project
          </button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        <div>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>

    
  )
}