import { createStackNavigator } from "react-navigation-stack"
import { SignInScreen, WelcomeScreen, SignUpScreen, } from "../screens"
import { transitionConfig } from "./transition-config"

export const AuthNavigator = createStackNavigator(
  {
    signUpScreen: { screen: SignUpScreen },
    signInScreen: { screen: SignInScreen },
    welcomeScreen: { screen: WelcomeScreen }
  },
  {
    initialRouteName: "welcomeScreen",
    headerMode: "none",
    transitionConfig
  }
)
