import { useStyleSheet, StyleService } from "@ui-kitten/components"
import React from "react"
import { View, ViewStyle } from "react-native"
import { spacing } from "../../theme"
import { getElevation } from "../../utils"

export interface CardProps extends ViewStyle {
  style?: ViewStyle
  children?: JSX.Element
}

export const Card = (props: CardProps) => {
  // grab the props
  const { style, children, ...rest } = props

  const styles = useStyleSheet(themedStyles)

  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  )
}

const themedStyles = StyleService.create({
  container: {
    ...getElevation(),
    backgroundColor: "white",
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[5],
    borderRadius: 8,
    shadowColor: "color-primary-default"
  }
})
