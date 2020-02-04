import { createStackNavigator, TransitionPresets } from "react-navigation-stack"
import { SignInScreen, WelcomeScreen, SignUpScreen, } from "../screens"

export const AuthNavigator = createStackNavigator(
  {
    signUpScreen: { screen: SignUpScreen },
    signInScreen: { screen: SignInScreen },
    welcomeScreen: {
      screen: WelcomeScreen,
    }
  },
  {
    initialRouteName: "welcomeScreen",
    headerMode: "none",
    defaultNavigationOptions: {
      ...TransitionPresets.ScaleFromCenterAndroid,
    },
  }
)
