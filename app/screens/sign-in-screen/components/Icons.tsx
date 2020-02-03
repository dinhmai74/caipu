import { Icon } from "@ui-kitten/components"
import React from "react"
import { TouchableOpacity } from "react-native-gesture-handler"

export const EyeIcon = ({ style, secureTextEntry, onPress, ...rest }) => {
  console.log(`%c style`, `color: blue; font-weight: 600`, style)
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon style={style} name={secureTextEntry ? "ios-eye-off" : "ios-eye"} {...rest} />
    </TouchableOpacity>
  )
}

export const FBicon = (style: any) => <Icon {...style} name="facebook" pack="feather" />
