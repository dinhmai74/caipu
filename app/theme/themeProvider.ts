import React from "react"
import { themes, ColorType} from "./color"
import { useStores } from "models/root-store"

export const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
})

export const useThemes = (): {
  color: ColorType
  toggle: () => void
  dark: boolean
} => {
  const { themeStore } = useStores()
  const color = themeStore?.type ? themes[themeStore.type] : themes.light

  let dark = true
  if (themeStore?.type) {
    dark = themeStore?.type === "dark"
  }

  return {
    color: { ...color },
    toggle: themeStore?.toggle,
    dark,
  }
}

export const themeProvider = { ...themes }
