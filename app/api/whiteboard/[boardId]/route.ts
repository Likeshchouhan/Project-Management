import {prisma} from "../../../lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { boardId: string } }
) {
    const { boardId } = await params
  const board = await prisma.whiteboard.findUnique({
    where: { id: boardId },
  })

  return NextResponse.json(board)
}

export async function PUT(
  req: Request,
  { params }: { params: { boardId: string } }
) {
    const { boardId } = await params
  const { data } = await req.json()

   const board = await prisma.whiteboard.upsert({
    where: { id: boardId },
    update: { data },
    create: { id: boardId, data },
  })

  return NextResponse.json({ success: true, board })
}