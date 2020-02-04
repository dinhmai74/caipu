import { createStackNavigator } from "react-navigation-stack"
import {} from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars
import { AuthNavigator } from "./auth-navigator"
import { PrimaryNavigator } from "./primary-navigator"
import { createAppContainer } from "react-navigation"

export const RootNavigator = createStackNavigator(
  {
    primaryStack: { screen: PrimaryNavigator },
    authStack: { screen: AuthNavigator }
  },
  {
    headerMode: "none",
    initialRouteName: "authStack",
    navigationOptions: { gesturesEnabled: false }
  }
)
