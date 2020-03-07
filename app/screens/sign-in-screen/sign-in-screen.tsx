import { useTheme, Spinner } from "@ui-kitten/components"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { TouchableOpacity } from "react-native"
import Animated, { set, Transition, Transitioning, useCode, Value } from "react-native-reanimated"
import { bInterpolate, delay } from "react-native-redash"
import { NavigationScreenProp } from "react-navigation"
import { useMemoOne } from "use-memo-one"
import { AppInput, AuthHeader, Button, Screen, SizedBox, Text, View } from "components"
// import { useStores } from "../../models/root-store"
import { images, sh, sw } from "theme"
import {
  getOpacity,
  getScaleAndOpacity,
  getTranslateX,
  normalDelay,
  useLayout,
  strings
} from "utils"
import { NavigateService } from "utils/navigate-service"
import { styles } from "./styles"
import { EyeIcon, FBicon } from "./components/Icons"
import { runTimingOb, runTimingWithEndActionOB } from "utils/reanimated"
import { useSpring, animated } from "react-spring/native"

const AnimButton = animated(Button)

export interface SignInScreenProps {
  navigation: NavigationScreenProp<any, any>
}

const formTransition = (
  <Transition.Sequence>
    <Transition.Out type="scale" />
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="fade" />
  </Transition.Sequence>
)

export const SignInScreen: React.FunctionComponent<SignInScreenProps> = observer(() => {
  // const { someStore } = useStores()
  const theme = useTheme()
  /* ------------------------ ref ------------------------ */
  const refForm = useRef(null)
  const refPw = useRef(null)

  /* ------------------------ state ------------------------ */
  const { register, handleSubmit, setValue } = useForm()
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
  const [successLogin, setSuccessLogin] = useState<boolean>(false)
  const [triggerSpreadOut, setTriggerSpreadOut] = useState<boolean>(false)
  const [isSignIn, setIsSignIn] = useState(true)

  const [btnCookLayout, layout] = useLayout()

  useEffect(() => {
    register("email")
    register("password")
  })

  const [springs, setSprings] = useSpring(() => ({ loadingBtnSize: 300 }))

  const btnLoadingStyle = {
    height: springs.loadingBtnSize.to(x => {
      if (x > 50) return 50
      return x
    }),
    width: springs.loadingBtnSize
  }

  /* ------------------------ methods ------------------------ */
  const onSubmit = (data: any) => {
    setSuccessLogin(true)
    setSprings({
      loadingBtnSize: 50
    })
    normalDelay(300).then(() => setTriggerSpreadOut(true))
  }
  /* ------------------------ anim ------------------------ */

  const duration = 300
  const {
    animWallpaper,
    animEmail,
    animPassword,
    animFgpw,
    animBtnCook,
    animBtnFb,
    animBtnCookOut
  } = useMemoOne(
    () => ({
      animEmail: new Value(0),
      animPassword: new Value(0),
      animFgpw: new Value(0),
      animBtnCook: new Value(0),
      animBtnFb: new Value(0),
      animWallpaper: new Value(0),
      animBtnCookOut: new Value(0)
    }),
    []
  )

  const anim = [
    {
      anim: animEmail,
      duration: duration
    },
    {
      anim: animPassword,
      duration: duration * 1.3
    },
    {
      anim: animFgpw,
      duration: duration * 2
    },
    {
      anim: animBtnCook,
      duration: duration * 1.5
    },
    {
      anim: animBtnFb,
      duration: duration * 1.7
    },
    {
      anim: animWallpaper,
      duration: duration * 3
    }
  ]

  anim.forEach(value => {
    useCode(() => set(value.anim, runTimingOb({ duration: value.duration })), [])
  })

  const nextScren = () => {
    NavigateService.navigate("welcomeScreen")
  }

  useCode(() => {
    if (triggerSpreadOut) {
      return set(animBtnCookOut, runTimingWithEndActionOB({ duration: 600, endAction: nextScren }))
    }
    return []
  }, [triggerSpreadOut])

  /* ------------------------ render ------------------------ */
  const renderBtns = () => (
    <View style={styles.btnView} onLayout={layout}>
      <Animated.View style={getScaleAndOpacity(animBtnCook)}>
        {!triggerSpreadOut && (
          <AnimButton
            full={false}
            onPress={handleSubmit(onSubmit)}
            style={[styles.btnCook, styles.btn, btnLoadingStyle]}
            size="large"
            status="success"
            loading={successLogin}
          >
            signInScreen.letsCook
          </AnimButton>
        )}
      </Animated.View>
      <Animated.View style={getScaleAndOpacity(animBtnFb)}>
        <Button icon={FBicon} style={styles.btn} />
      </Animated.View>
    </View>
  )

  const renderForm = () => (
    <View style={styles.container}>
      <Text category="h1">{isSignIn ? "signInScreen.title" : "signUpScreen.title"}</Text>
      <SizedBox h={5} />

      <Animated.View style={getTranslateX(animEmail, sw, 0)}>
        <AppInput
          label="auth.email"
          keyboardType="email-address"
          placeholder="auth.email"
          // onSubmitEditing={() => refPw.current.focus()}
          labelStyle={styles.label}
          onChangeText={text => setValue("email", text)}
        />
      </Animated.View>

      <SizedBox h={4} />

      {!isSignIn && (
        <>
          <AppInput
            label="auth.name"
            placeholder="auth.name"
            labelStyle={styles.label}
            onChangeText={text => setValue("name", text)}
          />
          <SizedBox h={4} />
        </>
      )}

      <Animated.View style={getTranslateX(animPassword, sw, 0)}>
        <AppInput
          label="auth.password"
          inputRef={refPw}
          placeholder={secureTextEntry ? "********" : "password"}
          icon={style => (
            <EyeIcon
              {...{ style, secureTextEntry }}
              onPress={() => {
                refForm.current.animateNextTransition()
                setSecureTextEntry(p => !p)
              }}
            />
          )}
          labelStyle={styles.label}
          secureTextEntry={secureTextEntry}
          onChangeText={text => setValue("password", text)}
        />
      </Animated.View>

      <Animated.View style={[getOpacity(animFgpw), styles.linkView]}>
        <TouchableOpacity style={styles.btnForgot}>
          <Text themeColor="color-basic-600" underline>
            signInScreen.forgotPassword
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnForgot}
          onPress={() => {
            refForm.current.animateNextTransition()
            setIsSignIn(p => !p)
          }}
        >
          <Text themeColor="color-basic-600">{isSignIn ? "auth.signUp" : "auth.signIn"}</Text>
        </TouchableOpacity>
      </Animated.View>
      <SizedBox h={4} />

      <Animated.View
        style={{
          position: "absolute",
          top: bInterpolate(animBtnCookOut, btnCookLayout ? btnCookLayout.y : 0, 0) || 0,
          right: (btnCookLayout ? btnCookLayout.x : 0) || 0,
          backgroundColor: theme["color-success-default"],
          width: bInterpolate(animBtnCookOut, 0, 900),
          height: bInterpolate(animBtnCookOut, 0, sh),
          opacity: bInterpolate(animBtnCookOut, 1, 0)
        }}
      />
    </View>
  )

  return (
    <Screen>
      <Animated.Image
        source={images.tasting}
        style={[styles.wallpaper, getOpacity(animWallpaper)]}
      />

      <AuthHeader title="welcomeScreen.title" />

      <Transitioning.View transition={formTransition} ref={refForm}>
        {renderForm()}
        {renderBtns()}
      </Transitioning.View>
    </Screen>
  )
})
