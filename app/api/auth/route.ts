import { prisma } from "../../lib/prisma"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { username } = await req.json()

  const normalized = username.toLowerCase()

  let user = await prisma.user.findUnique({
    where: { username: normalized }
  })

  if (!user) {
    user = await prisma.user.create({
      data: { username: normalized }
    })
  }

  const cookieStore = await cookies()
  cookieStore.set("userId", user.id, {
    httpOnly: true,
    path: "/",
  })

  return NextResponse.json(user)
}