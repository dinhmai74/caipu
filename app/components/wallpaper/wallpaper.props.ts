import { ViewStyle } from "react-native"
import { WallpaperPresets } from "./wallpaper.presets"

export interface WallpaperProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * An optional background image to override the default image.
   */
  bgColor?: string

  /**
   * One of the different types of wallpaper presets.
   */
  preset?: WallpaperPresets
}
