import { Animated, Easing } from "react-native"
import { strings } from "utils"

export const slideInFromBottom = (scene, layout, position) => {
  const thisSceneIndex = scene.index
  const height = layout.initHeight

  const translateY = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex],
    outputRange: [height, 0]
  })
  return { transform: [{ translateY }] }
}

export const slideInFromTop = (scene, layout, position) => {
  const thisSceneIndex = scene.index
  const height = layout.initHeight
  const translateY = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex],
    outputRange: [-height, 0]
  })
  return { transform: [{ translateY }] }
}

export const slideInFromRight = (scene, layout, position) => {
  const { index } = scene
  const width = layout.initWidth

  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  return { transform: [{ translateX }] }
}

export const slideInFromLeft = (scene, layout, position) => {
  const { index } = scene
  const width = layout.initWidth

  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [-width, 0, width]
  })
  return { transform: [{ translateX }] }
}

export const fadeInFromTop = (scene, layout, position) => {
  const thisSceneIndex = scene.index
  const height = layout.initHeight
  const translateY = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex],
    outputRange: [-height, 0]
  })
  return { transform: [{ translateY }] }
}

export const scaleWithOpacity = (scene, layout, position) => {
  const thisSceneIndex = scene.index
  const opacity = getOpacity(scene, layout, position)

  const scale = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    outputRange: [4, 1, 1]
  })

  return { opacity, transform: [{ scale }] }
}

export const getOpacity = (scene, layout, position) => {
  const thisSceneIndex = scene.index
  return position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    outputRange: [0, 1, 1]
  })
}

export const transitionSpec = {
  duration: 350,
  easing: Easing.linear,
  timing: Animated.timing,
  useNativeDriver: true
}

export const getScreenInterpolator = sceneProps => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { position, layout, scene, index, scenes } = sceneProps
  const opacity = getOpacity(scene, layout, position)
  let transform: any = slideInFromRight(scene, layout, position)

  if (scene.route.params) {
    const { transition } = scene.route.params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    let func = (scene, layout, position) => {}
    if (transition === strings.transitionFromLeft) {
      func = slideInFromLeft
    } else if (transition === strings.transitionFromTop) {
      func = slideInFromTop
    } else if (transition === strings.transitionFromBottom) {
      func = slideInFromBottom
    } else if (transition === strings.transitionScaleWithOpacity) {
      func = scaleWithOpacity
    }

    transform = func(scene, layout, position)

    if (transition === strings.transitionNone) transform = {}
  }

  return { ...transform, opacity }
}

export const transitionConfig = () => ({
  transitionSpec,
  screenInterpolator: sceneProps => {
    return getScreenInterpolator(sceneProps)
  },
  containerStyle: {
    backgroundColor: "transparent"
  }
})
