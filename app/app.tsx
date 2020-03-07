// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import { mapping } from "@eva-design/eva"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { contains } from "ramda"
import React, { useEffect, useState } from "react"
import { YellowBox } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"
import "./i18n"
import { RootStore, RootStoreProvider, setupRootStore } from "./models/root-store"
import { BackButtonHandler, exitRoutes, StatefulNavigator } from "./navigation"
import { ThemeContext, themeProvider } from "./theme"
import { IoniconsPack } from "./theme/icons/ionicons"
import { FeatherIconsPack } from "./theme/icons/feather-icon"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
// enableScreens()

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle"
])

enableScreens()

/**
 * Are we allowed to exit the app?  This is called when the back button
 * is pressed on android.
 *
 * @param routeName The currently active route name.
 */
const canExit = (routeName: string) => contains(routeName, exitRoutes)

/**
 * This is the root component of our app.
 */
export const App: React.FunctionComponent<{}> = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined) // prettier-ignore
  useEffect(() => {
    setupRootStore().then(setRootStore)
  }, [])
  const [theme, setTheme] = React.useState("light")
  const currentTheme = themeProvider[theme]

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
  }
  if (!rootStore) {
    return null
  }

  // otherwise, we're ready to render the app
  return (
    <React.Fragment>
      <SafeAreaProvider>
        <IconRegistry icons={[IoniconsPack, FeatherIconsPack]} />
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ApplicationProvider mapping={mapping} theme={currentTheme}>
            <RootStoreProvider value={rootStore}>
              <BackButtonHandler canExit={canExit}>
                <StatefulNavigator />
              </BackButtonHandler>
            </RootStoreProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    </React.Fragment>
  )
}

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "wuwo"
export default App
