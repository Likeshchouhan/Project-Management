import { prisma } from "../../lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { username } = await req.json()

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    )
  }

  const normalized = username.toLowerCase()

  let user = await prisma.user.findUnique({
    where: { username: normalized },
  })

  if (!user) {
    user = await prisma.user.create({
      data: { username: normalized },
    })
  }

  const response = NextResponse.json(user)

  response.cookies.set("userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })

  return response
}