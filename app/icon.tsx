import { ImageResponse } from "next/og"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {/* Simple code icon */}
      <div
        style={{
          display: "flex",
          fontSize: 24,
          fontWeight: "bold",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#333",
          color: "#61dafb",
        }}
      >
        {"</>"}
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  )
}
