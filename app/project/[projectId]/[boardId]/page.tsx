"use client"

import { Tldraw, useEditor } from "@tldraw/tldraw"
import "@tldraw/tldraw/tldraw.css"
import { useEffect, useState } from "react"

function AutoSave({ boardId }: { boardId: string }) {
  const editor = useEditor()

  useEffect(() => {
    if (!editor) return

    const unsubscribe = editor.store.listen(async () => {
      const snapshot = editor.getSnapshot()

      await fetch(`/api/whiteboard/${boardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: snapshot }),
      })
    })

    return () => unsubscribe()
  }, [editor, boardId])

  return null
}

export default function BoardPage({
  params,
}: {
  params: { boardId: string }
}) {
  const { boardId } = params

  const [initialData, setInitialData] = useState<any>(null)

  useEffect(() => {
    async function loadBoard() {
      const res = await fetch(`/api/whiteboard/${boardId}`)
      const data = await res.json()
      setInitialData(data?.data || {})
    }

    loadBoard()
  }, [boardId])

  if (initialData === null) return <p>Loading...</p>

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw snapshot={initialData}>
        <AutoSave boardId={boardId} />
      </Tldraw>
    </div>
  )
}