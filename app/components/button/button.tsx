import { Button as KTButton } from "@ui-kitten/components"
import { flatten, mergeAll } from "ramda"
import * as React from "react"
import { textPresets, viewPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { translate } from "../../i18n"
import { ViewStyle } from "react-native"

export class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    full: true
  }

  render() {
    const {
      preset = "primary",
      tx,
      txOptions,
      text,
      style: styleOverride,
      textStyle: textStyleOverride,
      children,
      full,
      ...rest
    } = this.props

    const notFullStyle: ViewStyle = !full && { alignSelf: "flex-start" }
    const viewStyle = mergeAll(
      flatten([viewPresets[preset] || viewPresets.primary, notFullStyle, styleOverride])
    )
    const textStyle = mergeAll(
      flatten([textPresets[preset] || textPresets.primary, textStyleOverride])
    )

    let content
    if (typeof children === "string") {
      content = translate(children, txOptions)
    } else content = children || text || (tx && translate(tx))

    return (
      <KTButton style={viewStyle} textStyle={textStyle} {...rest}>
        {content}
      </KTButton>
    )
  }
}
