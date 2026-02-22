"use client"

import { Tldraw , type Editor } from "@tldraw/tldraw"
import "@tldraw/tldraw/tldraw.css"
import { useEffect, useState } from "react"

export default function BoardPage({
  params,
}: {
  params: Promise<{ boardId: string }>
}) {
  const [initialData, setInitialData] = useState<any>(null)
  const [boardId, setBoardId] = useState<string>("")

  useEffect(() => {
    async function init() {
      const resolvedParams = await params
      setBoardId(resolvedParams.boardId)

      const res = await fetch(`/api/whiteboard/${resolvedParams.boardId}`)
      const data = await res.json()
      console.log("Fetched board data:", data)
      setInitialData(data?.data || {})
    }

    init()
  }, [params])

  // async function handleChange(editor: any) {
  //   const snapshot = editor.store.getSnapshot()

  //   await fetch(`/api/whiteboard/${boardId}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ data: snapshot }),
  //   })
  // }
  

  if (!initialData) return <p>Loading...</p>

   return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        snapshot={initialData ?? undefined}
        onPersist={async (editor: Editor) => {
          const snapshot = editor.getSnapshot()
          await fetch(`/api/whiteboard/${boardId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: snapshot }),
          })
        }}
      />
    </div>
  )
}
