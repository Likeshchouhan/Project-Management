import {prisma} from "../../../lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ boardId: string }> }
) {
  const { boardId } = await context.params

  const board = await prisma.whiteboard.findUnique({
    where: { id: boardId },
  })

  return NextResponse.json(board)
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ boardId: string }> }
) {
  const { boardId } = await context.params

  const body = await request.json()

  const updatedBoard = await prisma.whiteboard.update({
    where: { id: boardId },
    data: {
      name: body.name,
      data: body.data,
    },
  })

  return NextResponse.json({
    success: true,
    board: updatedBoard,
  })
}