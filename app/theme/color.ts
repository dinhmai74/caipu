import { palette } from "./palette"
import { lightColor } from "./light"
import { darkColor } from "./dark"

export const color = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  ...lightColor
}

export const themes = {
  light: {
    ...color
  },
  dark: {
    ...color,
    ...darkColor
  }
}

export type ColorType = typeof color
export type ThemeType = keyof typeof themes
