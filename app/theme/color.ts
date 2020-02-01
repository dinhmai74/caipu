import { palette } from "./palette"
import { lightColor } from "./light"
import { darkColor } from "./dark"

export const color = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
}

export const themes = {
  light: {
    ...lightColor,
    ...color,
  },
  dark: {
    ...darkColor,
    ...color,
  },
}

export type ColorType = typeof color
export type ThemeType = keyof typeof themes
