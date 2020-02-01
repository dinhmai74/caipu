import React from "react"
import { View, ViewStyle } from "react-native"
import { presets } from "./wallpaper.presets"
import { WallpaperProps } from "./wallpaper.props"

export function Wallpaper(props: WallpaperProps) {
  const { preset = "stretch", style: styleOverride, bgColor } = props
  // assemble the style
  const presetToUse = presets[preset] || presets.stretch

  const style: ViewStyle[] = [presetToUse, bgColor && { backgroundColor: bgColor }, styleOverride]

  return <View style={style} />
}
