import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Rocket, Palette, Gauge, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

import CrossyRoad from "./components/CrossyRoad"

function App() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      {/* Theme Toggle Button - Add this near the top */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>

      <div className="max-w-4xl w-full space-y-8">
        <a href="https://www.freecodecamp.org/news/how-to-code-a-crossy-road-game-clone-with-threejs/" target="_blank">Crossy Roads</a>

        <CrossyRoad />
      </div>
    </div>
  )
}

export default App
