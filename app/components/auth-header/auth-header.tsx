import { Icon, useStyleSheet, StyleService, useTheme } from "@ui-kitten/components"
import flatten from "ramda/es/flatten"
import mergeAll from "ramda/es/mergeAll"
import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { metrics, spacing } from "../../theme"
import { NavigateService } from "../../utils/navigate-service"
import { ChangeThemeIcon } from "../change-theme-icon/change-theme-icon"

export interface AuthHeaderProps {
  style?: ViewStyle
  title?: string
  onLeftPress?: () => void
}

export const AuthHeader = (props: AuthHeaderProps) => {
  // grab the props
  const { style: PStyle, title, onLeftPress, ...rest } = props
  const styles = useStyleSheet(themedStyles)

  const width = metrics.icon.md
  const height = metrics.icon.md

  const style: any = mergeAll(flatten([PStyle, styles.container]))
  const theme = useTheme()

  return (
    <View style={style} {...rest}>
      <TouchableOpacity
        style={styles.titleWrapper}
        onPress={() => {
          onLeftPress ? onLeftPress() : NavigateService.goBack()
        }}
      >
        <Icon name="star" width={32} height={32} fill="#3366FF" />

        <Text category="h6" style={styles.text}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    paddingBottom: spacing[6],
    paddingTop: spacing[2],
    paddingHorizontal: spacing[5],
    justifyContent: "space-between"
  },
  titleWrapper: {
    flexDirection: "row"
  },
  text: {
    color: "color-basic-600",
    marginHorizontal: spacing[1]
  },
  icView: {
    alignSelf: "flex-end"
  },
  icTheme: {}
})