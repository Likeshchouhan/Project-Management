import {prisma} from "../../lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const formData = await req.formData()

  const projectId = formData.get("projectId") as string
  const name = formData.get("name") as string

  if (!name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 })
  }

  const board = await prisma.whiteboard.create({
    data: {
      name,
      projectId,
    },
  })

  return NextResponse.redirect(
    `http://localhost:3000/project/${projectId}/${board.id}`
  )
}