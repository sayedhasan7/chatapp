import { View, Text, ScrollView, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native"

const User = () => {
  const [users, setusers] = useState()
  const [email, setemail] = useState()
  const navigation = useNavigation()

  const getUser = async () => {
    const email = await AsyncStorage.getItem("EMAIL")
    setemail(email)
    firestore().collection("users").where("email", "!=", email).get().then((res) => {
      let tempdata = []
      res.docs.map((item => tempdata.push(item.data())))
      if (res.docs != []) {
        setusers(tempdata)
      }
    })
  }

  useEffect(() => {
    getUser()
  }, [])



  return (
    <View>
      <FlatList data={users} renderItem={({ item }) => {
        return <TouchableOpacity onPress={() => navigation.navigate("Chats", { data: item, id: email})} activeOpacity={0.6} style={styles.useritem}>
          <Image style={styles.userimage} source={require("../images/profile.png")}></Image>
          <Text style={styles.usertext}>
            {item.name}
          </Text>
        </TouchableOpacity>
      }}>

      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  useritem: {
    width: "100%",
    alignSelf: "center",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    borderBottomWidth: 0.8,
    alignItems: "center"
  },
  userimage: {
    height: 40,
    width: 40,
    marginLeft: 10
  },
  usertext: {
    color: "black",
    fontSize: 20,
    marginLeft: 10
  }
})
export default User