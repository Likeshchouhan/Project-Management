import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete("userId")

  return NextResponse.redirect("http://localhost:3000")
}