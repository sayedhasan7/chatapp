import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
    const navigation = useNavigation()
    const route = useRoute();

    return (
        <View style={styles.container}>
            <View style={styles.innercontainer}>
                {
                    route.name == "Chats" && <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}><Image style={styles.backbutton} source={require("../images/backarrow.png")}></Image></TouchableOpacity>
                }
                <Text style={[styles.title]} >{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "purple",
        display: "flex",
        justifyContent: "center",
        paddingTop: 15,
        paddingBottom: 15,
        padding: 20
    },
    innercontainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        color: "white",
        fontSize: 25
    },
    backbutton: {
        height: 20,
        width: 20,
        tintColor: "white",
        marginRight: 15,
    }

})

export default Header