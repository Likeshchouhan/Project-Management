import { prisma } from "../../lib/prisma"
import { getCurrentUser } from "../../lib/session"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId: user.id,
      deleted: false,
    },
  })

  if (!project) {
    return <div>Project not found</div>
  }

  const boards = await prisma.whiteboard.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div style={{ padding: "20px" }}>
      <h1>{project.name}</h1>
      <p>Project ID: {project.id}</p>

      <hr style={{ margin: "20px 0" }} />

      <h2>Whiteboards</h2>

      <form action="/api/whiteboard" method="POST">
        <input type="hidden" name="projectId" value={projectId} />
        <input name="name" placeholder="New board name" required />
        <button type="submit">Create</button>
      </form>

      <ul style={{ marginTop: "20px" }}>
        {boards.length === 0 && <p>No whiteboards yet</p>}

        {boards.map((board) => (
          <li key={board.id}>
            <Link href={`/project/${projectId}/${board.id}`}>
              {board.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}