import { Icon, useTheme } from "@ui-kitten/components"
import React, { useContext } from "react"
import { ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { metrics, ThemeContext } from "../../theme"

export interface ChangeThemeIconProps {
  style?: ViewStyle
}

export const ChangeThemeIcon = (props: ChangeThemeIconProps) => {
  // grab the props
  const { style, ...rest } = props
  const theme = useTheme()
  const themeContext = useContext(ThemeContext)
  const iconThemeName = themeContext.theme === "dark" ? "moon-outline" : "sun-outline"

  const width = metrics.icon.md
  const height = metrics.icon.md

  return (
    <TouchableOpacity style={style} onPress={() => themeContext.toggleTheme()}>
      <Icon name={iconThemeName} {...{ width, height }} fill={theme["color-basic-600"]} />
    </TouchableOpacity>
  )
}
