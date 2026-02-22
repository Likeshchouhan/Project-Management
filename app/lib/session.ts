import { cookies } from "next/headers"
import { prisma } from "./prisma"

export async function getCurrentUser() {
  const cookieStore = await cookies()   // ✅ MUST await in Next 16
  const userId = cookieStore.get("userId")?.value

  if (!userId) return null

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  return user
}

export async function requireUser() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  return user
}

export async function logout() {
  const cookieStore = await cookies()   // ✅ await here also
  cookieStore.delete("userId")
}