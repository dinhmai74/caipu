import { StyleService } from "@ui-kitten/components"
import { metrics, spacing } from "../../theme"

export const themedStyles = StyleService.create({
  wallpaper: {
    ...metrics.images.logo,
    position: "absolute",
    left: spacing[6],
    right: 0,
    bottom: spacing[6],
    resizeMode: "contain"
  },
  container: {
    paddingHorizontal: spacing[6]
  },
  label: {
    paddingBottom: spacing[1]
  },
  btnForgot: {
    alignSelf: "flex-start",
    marginVertical: spacing[4]
  },
  linkView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  btnView: {},
  btn: {
    alignSelf: "flex-end",
    borderRadius: 0,
    borderTopLeftRadius: spacing[2],
    borderBottomLeftRadius: spacing[2],
    marginVertical: spacing[2]
  },
  btnCook: {
    paddingHorizontal: spacing[7]
  },
  circle: {
    alignSelf: "flex-end",
    backgroundColor: "color-success-default"
  }
})
