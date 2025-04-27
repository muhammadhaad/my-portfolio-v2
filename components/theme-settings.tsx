"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Settings2, X, Sun, Moon, Contrast, Palette } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemePreview } from "@/components/theme-preview"

export function ThemeSettings() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [contrastMode, setContrastMode] = useState("standard")

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Get stored font size or default to 100%
    const storedFontSize = localStorage.getItem("fontSize")
    if (storedFontSize) {
      setFontSize(Number.parseInt(storedFontSize))
      document.documentElement.style.fontSize = `${Number.parseInt(storedFontSize)}%`
    }

    // Get stored contrast mode
    const storedContrastMode = localStorage.getItem("contrastMode")
    if (storedContrastMode) {
      setContrastMode(storedContrastMode)
    }
  }, [])

  // Update font size
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0]
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
    localStorage.setItem("fontSize", newSize.toString())
  }

  // Update contrast mode
  const handleContrastModeChange = (value: string) => {
    setContrastMode(value)
    localStorage.setItem("contrastMode", value)

    // Update theme based on contrast mode and current light/dark preference
    const isDark = theme?.includes("dark") || false

    if (value === "high") {
      setTheme(isDark ? "dark-high-contrast" : "light-high-contrast")
    } else {
      setTheme(isDark ? "dark" : "light")
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="ml-2">
          <Settings2 className="h-5 w-5" />
          <span className="sr-only">Accessibility settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Accessibility Settings</SheetTitle>
          <SheetDescription>
            Customize the appearance of the website to improve readability and contrast.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <Tabs defaultValue="theme" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="theme">
                <Palette className="h-4 w-4 mr-2" />
                Theme
              </TabsTrigger>
              <TabsTrigger value="accessibility">
                <Contrast className="h-4 w-4 mr-2" />
                Accessibility
              </TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Color Theme</Label>
                <RadioGroup id="theme" value={theme} onValueChange={setTheme} className="grid grid-cols-2 gap-2">
                  <div>
                    <RadioGroupItem value="light" id="light" className="sr-only" />
                    <Label
                      htmlFor="light"
                      className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground ${
                        theme === "light" ? "border-primary" : ""
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#ffffff] border border-gray-200 mb-2"></div>
                      <Sun className="h-4 w-4 mb-1" />
                      Light
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark" id="dark" className="sr-only" />
                    <Label
                      htmlFor="dark"
                      className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground ${
                        theme === "dark" ? "border-primary" : ""
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-gray-700 mb-2"></div>
                      <Moon className="h-4 w-4 mb-1" />
                      Dark
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="light-high-contrast" id="light-high-contrast" className="sr-only" />
                    <Label
                      htmlFor="light-high-contrast"
                      className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground ${
                        theme === "light-high-contrast" ? "border-primary" : ""
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#ffffff] border-4 border-black mb-2"></div>
                      <Contrast className="h-4 w-4 mb-1" />
                      High Contrast Light
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark-high-contrast" id="dark-high-contrast" className="sr-only" />
                    <Label
                      htmlFor="dark-high-contrast"
                      className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground ${
                        theme === "dark-high-contrast" ? "border-primary" : ""
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#000000] border-4 border-yellow-400 mb-2"></div>
                      <Contrast className="h-4 w-4 mb-1" />
                      High Contrast Dark
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-6">
                <Label className="mb-2 block">Preview</Label>
                <ThemePreview />
              </div>
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-6">
              <div className="space-y-2">
                <Label>Contrast Level</Label>
                <RadioGroup
                  value={contrastMode}
                  onValueChange={handleContrastModeChange}
                  className="grid grid-cols-2 gap-2"
                >
                  <div>
                    <RadioGroupItem value="standard" id="standard-contrast" className="sr-only" />
                    <Label
                      htmlFor="standard-contrast"
                      className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground ${
                        contrastMode === "standard" ? "border-primary" : ""
                      }`}
                    >
                      <div className="w-full h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded mb-2"></div>
                      Standard Contrast
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="high" id="high-contrast" className="sr-only" />
                    <Label
                      htmlFor="high-contrast"
                      className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground ${
                        contrastMode === "high" ? "border-primary" : ""
                      }`}
                    >
                      <div className="w-full h-8 bg-gradient-to-r from-white to-gray-100 dark:from-black dark:to-gray-900 rounded mb-2"></div>
                      High Contrast
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="font-size">Text Size ({fontSize}%)</Label>
                  <Button variant="outline" size="sm" onClick={() => handleFontSizeChange([100])}>
                    Reset
                  </Button>
                </div>
                <Slider
                  id="font-size"
                  min={75}
                  max={150}
                  step={5}
                  value={[fontSize]}
                  onValueChange={handleFontSizeChange}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Smaller</span>
                  <span>Default</span>
                  <span>Larger</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
