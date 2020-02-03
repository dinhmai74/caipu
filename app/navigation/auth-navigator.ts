import { createStackNavigator } from "react-navigation-stack"
import { SignInScreen, WelcomeScreen } from "../screens"
import { transitionConfig } from "./transition-config"

export const AuthNavigator = createStackNavigator(
  {
    signInScreen: { screen: SignInScreen },
    welcomeScreen: { screen: WelcomeScreen }
  },
  {
    initialRouteName: "welcomeScreen",
    headerMode: "none",
    transitionConfig
  }
)
