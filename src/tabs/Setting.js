import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import firestore from '@react-native-firebase/firestore'
import BottomSheet from '../components/BottomSheet'


const Setting = () => {
  const [name, setname] = useState()
  const [password, setpassword] = useState()
  const [mobilenumber, setmobilenumber] = useState()
  const [email, setemail] = useState()
  const [userid, setuserid] = useState()
  const [visible, setvisible] = useState(false)
  const [title, settitle] = useState()
  const [asyncname, setasyncname] = useState()
  const [currentvalue, setcurrentvalue] = useState()

  const handlevisible = (visible) => {
    setvisible(visible)
  }

  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem("NAME")
      const password = await AsyncStorage.getItem("PASSWORD")
      const email = await AsyncStorage.getItem("EMAIL")
      const mobilenumber = await AsyncStorage.getItem("MOBILENO")
      const userID = await AsyncStorage.getItem("USERID")
      setname(name)
      setpassword(password)
      setemail(email)
      setmobilenumber(mobilenumber)
      setuserid(userID)
    })()
  })

  const handlechange = (asyncname, title, currentvalue) => {
    console.log(title,currentvalue)
    settitle(title)
    setcurrentvalue(currentvalue)
    setasyncname(asyncname)
    setvisible(true)
  }

  return (
    <View style={styles.main}>

      <View style={styles.header}>
        <View style={[styles.circle, { display: Dimensions.get("window").width > 500 ? "none" : "" }]}>
        </View>
        <Image style={styles.profile} source={require("../images/profile.png")}></Image>
        <Text style={styles.headertext}>{name}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.settingview}>
          <Image style={styles.Icon} source={require("../images/user.png")}></Image>
          <Text style={styles.settingtitle}>{name}</Text>
          <TouchableOpacity onPress={() => handlechange("NAME", "name", name)} style={{ marginLeft: "auto" }}>
            <Image style={[styles.Icon, styles.editicon]} source={require("../images/pencil.png")} /></TouchableOpacity>
        </View>
        <View style={styles.settingview}>
          <Image style={styles.Icon} source={require("../images/mail.png")}></Image>
          <Text style={styles.settingtitle}>{email}</Text>
          <TouchableOpacity onPress={() => handlechange("EMAIL", "email", email)} style={{ marginLeft: "auto" }}>
            <Image style={[styles.Icon, styles.editicon]} source={require("../images/pencil.png")} /></TouchableOpacity>
        </View>
        <View style={styles.settingview}>
          <Image style={styles.Icon} source={require("../images/eye.png")}></Image>
          <Text style={styles.settingtitle}>{password}</Text>
          <TouchableOpacity onPress={() => handlechange("PASSWORD", "password", password)} style={{ marginLeft: "auto" }}>
            <Image style={[styles.Icon, styles.editicon]} source={require("../images/pencil.png")} /></TouchableOpacity>
        </View>
        <View style={styles.settingview}>
          <Image style={styles.Icon} source={require("../images/phone.png")}></Image>
          <Text style={styles.settingtitle}>{mobilenumber}</Text>
          <TouchableOpacity onPress={() => handlechange("MOBILENO", "mobilenumber", mobilenumber)} style={{ marginLeft: "auto" }}>
            <Image style={[styles.Icon, styles.editicon]} source={require("../images/pencil.png")}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet isVisible={visible} title={title}  userid={userid} currentvalue={currentvalue} asyncname={asyncname} handlevisible={handlevisible} />
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: Dimensions.get("window").width > 500 ? "row" : "column",
    justifyContent: "center",
  },
  header: {
    height: Dimensions.get("window").width > 500 ? "100%" : "30%",
    width: Dimensions.get("window").width > 500 ? "40%" : "100%",
    alignItems: "center",
    justifyContent: Dimensions.get("window").width > 500 ? "center" : "",
  },
  headertext: {
    marginTop: 20,
    color: Dimensions.get("window").width > 500 ? "black" : "white",
    fontSize: 30,
  },
  circle: {
    height: 520,
    width: 540,
    borderRadius: 5000,
    position: "absolute",
    top: -300,
    alignSelf: "center",
    backgroundColor: "purple"
  },
  container: {
    height: Dimensions.get("window").width > 500 ? "100%" : "70%",
    width: Dimensions.get("window").width > 500 ? "60%" : "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: Dimensions.get("window").width > 500 ? "center" : "",
  },
  profile: {
    height: 100,
    width: 100,
  },
  Icon: {
    height: 30,
    width: 30,
    tintColor: "dodgerblue"
  },
  settingview: {
    padding: 20,
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "black",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  settingtitle: {
    fontSize: 20,
    color: "black",
    marginLeft: 20
  },
  editicon: {
    height: 25,
    width: 25,
  }
})

export default Setting