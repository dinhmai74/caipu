import { createStackNavigator } from "react-navigation-stack"
import { SignInScreen, WelcomeScreen, SignUpScreen } from "../screens"
import {
  zoomIn,
  fromRight,
  fromLeft,
  fadeIn,
  fadeOut,
  fromTop,
  fromBottom,
	flipX,
	flipY,
	zoomOut
} from "react-navigation-transitions"
import { strings } from "utils"

export const handleCustomTransition = (nav: any)=> {
  const { scenes } = nav

  const prevScene = scenes[scenes.length - 2]
  const nextScene = scenes[scenes.length - 1]
	console.log("pre", prevScene?.route?.params?.transition);
	console.log("next", nextScene?.route?.params?.transition);

  if (nextScene && nextScene.route && nextScene.route.params && nextScene.route.params.transition) {
    const { transition } = nextScene.route.params
		switch (transition) {
			case strings.transitionFromLeft: return fromLeft()
    case strings.transitionFromRight :return fromRight()
    case strings.transitionFadeIn :return fadeIn()
    case strings.transitionNone :return fadeIn()
    case strings.transitionFadeOut :return fadeOut()
    case strings.transitionFromBottom :return fromBottom()
    case strings.transitionFromTop :return fromTop()
    case strings.transitionZoomIn :return zoomIn()
    case strings.transitionZoomOut :return zoomOut()
    case strings.transitionFlipX:return flipX()
    case strings.transitionFlipY:return flipY()
 
		}
 }

  return fadeIn()
}

export const AuthNavigator = createStackNavigator(
  {
    signUpScreen: { screen: SignUpScreen },
    signInScreen: { screen: SignInScreen },
    welcomeScreen: {
      screen: WelcomeScreen
    }
  },
  {
    initialRouteName: "welcomeScreen",
    headerMode: "none",
    //defaultNavigationOptions: {
    //...TransitionPresets.ScaleFromCenterAndroid,
    //},
    transitionConfig: nav => handleCustomTransition(nav)
  }
)
