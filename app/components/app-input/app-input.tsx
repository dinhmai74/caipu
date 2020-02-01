import { Input, InputProps } from "@ui-kitten/components"
import React from "react"
import { StyleSheet } from "react-native"
import { translate } from "../../i18n"
import { spacing } from "../../theme"

export interface AppInputProps extends InputProps {
  inputRef?: any
}

export const AppInput = (props: AppInputProps) => {
  // grab the props
  const { style, label: PLabel, labelStyle, placeholder: PPlaceholder, inputRef, ...rest } = props
  const label = translate(PLabel)
  const placeholder = translate(PPlaceholder)

  return (
    <Input
      labelStyle={[styles.label, labelStyle]}
      {...{ label, placeholder }}
      {...rest}
      ref={inputRef}
    />
  )
}

const styles = StyleSheet.create({
  label: {
    paddingBottom: spacing[2],
  },
})
