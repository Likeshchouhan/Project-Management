"use client"

import { Tldraw } from "@tldraw/tldraw"
import "@tldraw/tldraw/tldraw.css"
import { useState } from "react"

export default function WhiteboardEditor({ boardId }: { boardId: string }) {
  const [editor, setEditor] = useState<any>()

  const handleSave = async () => {
    const snapshot = editor.store.getSnapshot()

    await fetch("/api/whiteboard", {
      method: "POST",
      body: JSON.stringify({
        id: boardId,
        data: snapshot,
      }),
    })

  }

  return (
    <div className="h-screen">
      <button onClick={handleSave} className="absolute z-50 bg-black text-white p-2">
        Save
      </button>
      <Tldraw onMount={(editor) => setEditor(editor)} />
    </div>
  )
}