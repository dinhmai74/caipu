import React from "react"
import { themes } from "./color"

export const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
})

export const themeProvider = { ...themes }
