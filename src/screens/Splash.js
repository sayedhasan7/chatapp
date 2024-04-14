import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"


const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            checklogin()
        }, 2000);
    }, [])

    const checklogin = async () => {
        const id = await AsyncStorage.getItem("USERID")
        if (id) { navigation.navigate("Home") } else { navigation.navigate("Login") }
    }

    return (
        <>
            <StatusBar backgroundColor={"purple"}></StatusBar>
            <View style={style.container}>
                <Text style={style.appname}>Chat App</Text>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "purple"
    },
    appname: {
        fontSize: 40,
        color: "white",
    }
})
export default Splash

