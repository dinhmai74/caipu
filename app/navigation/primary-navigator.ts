import createNativeStackNavigator from "react-native-screens/createNativeStackNavigator"
import { HomeScreen, } from "../screens"
import { transitionConfig } from "./transition-config"

export const PrimaryNavigator = createNativeStackNavigator(
  {
    homeScreen: { screen: HomeScreen },
  },
  {
    initialRouteName: "homeScreen",
    headerMode: "none",
    transitionConfig 
  },
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["homeScreen",]
