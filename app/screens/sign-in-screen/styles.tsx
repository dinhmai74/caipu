import { metrics, spacing } from "../../theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  accordionButtonStyle: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  bar: {
    backgroundColor: "#AAA",
    height: 5,
    marginTop: 30,
    width: "80%"
  },
  btn: {
    alignSelf: "flex-end",
    borderBottomLeftRadius: spacing[2],
    borderRadius: 0,
    borderTopLeftRadius: spacing[2],
    marginVertical: spacing[2]
  },
  btnCook: {
    paddingHorizontal: spacing[7]
  },
  btnForgot: {
    alignSelf: "flex-start",
    marginVertical: spacing[4]
  },
  btnView: {},
  centerAll: {
    alignItems: "center",
    flex: 1,
    marginTop: 100
  },
  container: {
    paddingHorizontal: spacing[6]
  },
  icon: {},
  input: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 40,
    padding: 10,
  },
  label: {
    paddingBottom: spacing[1]
  },
  linkView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  wallpaper: {
    ...metrics.images.logo,
    bottom: spacing[6],
    left: spacing[6],
    position: "absolute",
    resizeMode: "contain",
    right: 0
  }
})
