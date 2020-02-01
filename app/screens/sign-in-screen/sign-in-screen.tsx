import { useStyleSheet, useTheme } from "@ui-kitten/components"
import { Ionicons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Button as KTButton } from "@ui-kitten/components"
import { TouchableOpacity, ScrollView, StyleSheet as RNStyleSheet } from "react-native"
import Animated, {
  Transition,
  Transitioning,
  Value,
  Clock,
  block,
  set,
  useCode
} from "react-native-reanimated"
import { NavigationScreenProp } from "react-navigation"
import {
  AppInput,
  AuthHeader,
  Button,
  Screen,
  SizedBox,
  Text,
  View,
  Wallpaper
} from "../../components"
// import { useStores } from "../../models/root-store"
import { images, metrics, spacing, ThemeContext, screenSize, sw } from "../../theme"
import { runTiming, runTimingOb } from "../../utils/reanimated"
import { timing, bInterpolate, delay } from "react-native-redash"
import {
  getOpacity,
  getScale,
  getScaleAndOpacity,
  getTranslateX,
  getCircle,
  normalDelay,
  getSize
} from "../../utils"
import { useMemoOne } from "use-memo-one"
import { themedStyles } from "./styles"

const AnimButton = Animated.createAnimatedComponent(KTButton)

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
  const styles = useStyleSheet(themedStyles)
  const theme = useTheme()
  /* ------------------------ ref ------------------------ */
  const refForm = useRef(null)
  const refPw = useRef(null)

  /* ------------------------ state ------------------------ */
  const { register, handleSubmit, setValue } = useForm()
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
  const [successLogin, setSuccessLogin] = useState<boolean>(false)
  const [triggerSpreadOut, setTriggerSpreadOut] = useState<boolean>(false)

  useEffect(() => {
    register("email")
    register("password")
  })

  /* ------------------------ methods ------------------------ */
  const onSubmit = data => {
    setSuccessLogin(true)
    normalDelay(200).then(() => setTriggerSpreadOut(true))
    refForm.current.animateNextTransition()
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

  useCode(() => {
    if (triggerSpreadOut) {
      return set(animBtnCookOut, timing({}))
    }
  }, [triggerSpreadOut])

  /* ------------------------ render ------------------------ */
  const renderIcon = style => <Ionicons name="" size={32} color="green" />

  const renderBtns = () => (
    <View style={styles.btnView}>
      <Animated.View style={getScaleAndOpacity(animBtnCook)}>
        {successLogin ? (
          <AnimButton style={[styles.btn]} size="small" status="success" />
        ) : (
          <AnimButton
            full={false}
            onPress={handleSubmit(onSubmit)}
            style={[styles.btnCook, styles.btn]}
            size="large"
            status="success"
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
      <Text category="h1">signInScreen.title</Text>
      <SizedBox h={7} />

      <Animated.View style={getTranslateX(animEmail, sw, 0)}>
        <AppInput
          label="common.email"
          keyboardType="email-address"
          placeholder="common.email"
          onSubmitEditing={() => refPw.current.focus()}
          labelStyle={styles.label}
          onChangeText={text => setValue("email", text)}
        />
      </Animated.View>

      <SizedBox h={4} />

      <Animated.View style={getTranslateX(animPassword, sw, 0)}>
        <AppInput
          label="common.password"
          inputRef={refPw}
          placeholder={secureTextEntry ? "********" : "password"}
          icon={renderIcon}
          onIconPress={() => {
            refForm.current.animateNextTransition()
            setSecureTextEntry(p => !p)
          }}
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

        <TouchableOpacity style={styles.btnForgot}>
          <Text themeColor="color-basic-600">auth.signUp</Text>
        </TouchableOpacity>
      </Animated.View>
      <SizedBox h={4} />
    </View>
  )

  return (
    <Screen>
      <Animated.Image
        source={images.tasting}
        style={[styles.wallpaper, getOpacity(animWallpaper)]}
      />

      <ScrollView>
        <Transitioning.View transition={formTransition} ref={refForm}>
          {renderForm()}
          {renderBtns()}
        </Transitioning.View>
      </ScrollView>
      {/* {successLogin && (
        <Animated.View
          style={{
            ...RNStyleSheet.absoluteFillObject,
            backgroundColor: theme["color-success-default"],
            ...getOpacity(animBtnCookOut),
          }}
        />
      )} */}
    </Screen>
  )
})

const FBicon = style => <Ionicons name="md-checkmark-circle" size={32} color="green" />
