import React, { useRef } from 'react'

export default function EarthImg({ uv, setUv, src = '/texture.jpg' }) {
  const containerRef = useRef(null)

  const handleClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const u = x / rect.width
    // 因为图片翻转了，所以点击位置的v需要反转
    const v = 1 - (y / rect.height)

    console.log("点击图片更新 uv:", { u, v })
    setUv({ x: u, y: v })
  }

  const leftPercent = uv ? `${(uv.x * 100).toFixed(2)}%` : null
  // 因为图片翻转了，标记点位置也需要反转Y坐标
  const topPercent = uv ? `${((1 - uv.y) * 100).toFixed(2)}%` : null

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        width: 320,
        aspectRatio: '2 / 1',
        border: '2px solid #444',
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'crosshair'
      }}
    >
      <img
        src={src}
        alt="Earth texture"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          transform: 'scaleY(-1)'
        }}
      />

      {uv && (
        <div
          style={{
            position: 'absolute',
            left: leftPercent,
            top: topPercent,
            transform: 'translate(-50%, -50%)',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'red',
            border: '2px solid white'
          }}
        />
      )}
    </div>
  )
}
