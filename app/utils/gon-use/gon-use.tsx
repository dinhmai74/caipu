import { useCallback, useState } from "react"
import { Dimensions } from "react-native"
import { bInterpolate } from "react-native-redash"
import Animated from "react-native-reanimated"

interface Size {
  width: number
  height: number
}

export const useComponentSize = (): [Size, any] => {
  const [size, setSize] = useState(null)

  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
  }, [])

  return [size, onLayout]
}

export const useWindowSize = () => {
  const { width, height } = Dimensions.get("window")
  const screen = { width, height }
  const sw = width
  const sh = height

  return { screen, sw, sh }
}

export const getOpacity: any = (value, from = 0, to = 1) => ({
  opacity: bInterpolate(value, from, to),
})

export const getScale: any = (value, from = 0, to = 1) => ({
  scale: bInterpolate(value, from, to),
})

export const getScaleAndOpacity: any = (value, from = 0, to = 1) => ({
  ...getOpacity(value, from, to),
  transform: [getScale(value, from, to)],
})

export const getTranslateX: any = (value, from = 100, to = 0) => ({
  transform: [
    {
      translateX: bInterpolate(value, from, to),
    },
  ],
})

export const getCircle = (value: number = 50) => ({
  borderRadius: value / 2,
  ...getSize(value),
})

export const getAnimateCircle = (animatedValue: Animated.Value<number>, from = 0, to = 50) => {
  const size = bInterpolate(animatedValue, from, to)
  const border = bInterpolate(animatedValue, from, to / 2)
  return {
    borderRadius: border,
    width: size,
    height: size,
  }
}

export const getSize = (value: number) => ({
  width: value,
  height: value,
})
