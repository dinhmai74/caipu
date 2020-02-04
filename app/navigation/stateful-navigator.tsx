import { observer } from "mobx-react-lite"
import * as React from "react"
// @ts-ignore: until they update @type/react-navigation
import { getNavigation, NavigationScreenProp, NavigationState } from "react-navigation"
import { useStores } from "../models/root-store"
import { NavigateService } from "../utils/navigate-service"
import { RootNavigator } from "./root-navigator"

let currentNavigation: NavigationScreenProp<NavigationState> | undefined

export const StatefulNavigator: React.FunctionComponent<{}> = observer(() => {
  const {
    navigationStore: { state, dispatch, actionSubscribers, reset }
  } = useStores()

  currentNavigation = getNavigation(
    RootNavigator.router,
    state,
    dispatch,
    actionSubscribers(),
    {},
    () => currentNavigation
  )

  // reset navigation if have a problem
  //React.useEffect(() => {
  //reset()
  //})

  NavigateService.setTopLevelNavigator(currentNavigation)

  return <RootNavigator navigation={currentNavigation} />
})
