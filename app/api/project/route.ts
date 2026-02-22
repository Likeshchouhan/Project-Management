import { prisma } from "../../lib/prisma"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  console.log("Fetching projects...")
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value


  if (!userId) {
    return NextResponse.json([], { status: 200 })
  }

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { sharedUsers: { some: { userId } } }
      ]
    },
    include: { owner: true }
  })

  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  console.log("post api hit")
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, description } = await req.json()

  const project = await prisma.project.create({
    data: { name, description, ownerId: userId! }
  })

  console.log("Created project:", project)

  return NextResponse.json(project)
}

export async function DELETE(req: Request) {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await req.json()

  await prisma.project.delete({
    where: {
      id,
      ownerId: userId, 
    },
  })

  return NextResponse.json({ success: true })
}

export async function PUT(req: Request) {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, name } = await req.json()

  const project = await prisma.project.updateMany({
    where: {
      id,
      ownerId: userId,
    },
    data: {
      name,
    },
  })

  return NextResponse.json(project)
}