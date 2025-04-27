"use client"

import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

export function ThemePreview() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Current Theme: {theme}</h3>
            <Badge variant="outline">{theme?.includes("dark") ? "Dark Mode" : "Light Mode"}</Badge>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-background border border-border"></div>
              <span className="text-sm">Background</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-foreground"></div>
              <span className="text-sm">Foreground</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span className="text-sm">Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-secondary"></div>
              <span className="text-sm">Secondary</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm">Primary Button</Button>
            <Button size="sm" variant="secondary">
              Secondary Button
            </Button>
            <Button size="sm" variant="outline">
              Outline Button
            </Button>
          </div>

          <div className="p-3 bg-secondary rounded-md text-secondary-foreground text-sm">
            This is how text appears on a secondary background.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
