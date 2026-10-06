'use client'

import { useCallback, useState } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { Loader2, X } from 'lucide-react'

const OUTPUT_SIZE = 800

async function cropToFile(src: string, area: Area): Promise<File> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image()
    el.onload = () => resolve(el)
    el.onerror = () => reject(new Error('Could not read that image.'))
    el.src = src
  })
  const size = Math.min(OUTPUT_SIZE, Math.round(area.width))
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not crop the image.')
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, size, size)
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9))
  if (!blob) throw new Error('Could not crop the image.')
  return new File([blob], 'photo.jpg', { type: 'image/jpeg' })
}

interface Props {
  src: string
  onCancel: () => void
  onDone: (file: File) => Promise<void> | void
}

export default function PhotoCropper({ src, onCancel, onDone }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [area, setArea] = useState<Area | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const onCropComplete = useCallback((_: Area, pixels: Area) => setArea(pixels), [])

  const save = async () => {
    if (!area) return
    setSaving(true)
    setError('')
    try {
      await onDone(await cropToFile(src, area))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not crop the image.')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/40 backdrop-blur-sm">
      <div className="bg-surface-1 border border-border rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Crop your photo</h2>
            <p className="text-xs text-foreground-muted mt-0.5">Drag to reposition, use the slider to zoom</p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-surface-2 rounded-lg transition-colors" aria-label="Cancel">
            <X className="w-5 h-5 text-foreground-muted" />
          </button>
        </div>

        <div className="relative w-full h-72 bg-surface-3 rounded-xl overflow-hidden">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
          aria-label="Zoom"
        />

        {error && <p className="text-sm text-error">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={save}
            disabled={saving || !area}
            className="flex-1 py-2.5 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover disabled:opacity-60 transition-all flex items-center justify-center gap-2"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving…</> : 'Save photo'}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="px-5 py-2.5 bg-surface-2 text-foreground font-semibold rounded-lg border border-border hover:bg-surface-3 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
