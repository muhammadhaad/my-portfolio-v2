"use client"

import Image from "next/image"
import { useState } from "react"

interface ProjectImageProps {
  src: string
  alt: string
}

export default function ProjectImage({ src, alt }: ProjectImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setImgSrc("/placeholder.svg?height=300&width=600")}
    />
  )
}
