import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
// import Icon from "react-native-vector-icons/Feather"
import Icon from "react-native-vector-icons/Ionicons"
import { createIconsMap } from "theme/icons"

export const IoniconsPack = {
  name: "ionicons",
  icons: createIconsMap(Icon)
}
