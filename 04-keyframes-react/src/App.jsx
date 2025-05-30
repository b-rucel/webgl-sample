import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket, Palette, Gauge, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import MyThree from "@/components/Three.jsx"

function App() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>

      <div id="info">
        <a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - animation - keyframes<br/>
        Model: <a href="https://artstation.com/artwork/1AGwX" target="_blank" rel="noopener">Littlest Tokyo</a> by
        <a href="https://artstation.com/glenatron" target="_blank" rel="noopener">Glen Fox</a>, CC Attribution.
      </div>

      <MyThree />
    </div>
  )
}

export default App
