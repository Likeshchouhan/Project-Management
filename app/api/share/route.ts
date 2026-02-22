import { prisma } from "../../lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { username, projectId } = await req.json()

  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase() }
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  await prisma.projectShare.create({
    data: {
      userId: user.id,
      projectId
    }
  })

  return NextResponse.json({ success: true })
}