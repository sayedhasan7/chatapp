import { View, Text, BackHandler, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import User from '../tabs/User';
import useRoute from "@react-navigation/native"
import Setting from '../tabs/Setting';
import Header from '../components/Header';

const Home = ({ navigation }) => {
    const [selectedtab, setselectedtab] = useState(0)

    useEffect(() => {
        const handleBackButton = () => {
            Alert.alert(
                'Exit App',
                'Are you sure you want to exit the app?',
                [
                    { text: 'No', onPress: () => null, style: 'cancel' },
                    { text: 'Yes', onPress: () => BackHandler.exitApp() }
                ],
                { cancelable: false }
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => backHandler.remove(); // Cleanup function to remove the event listener
    }, [navigation]); // Dependency array ensures effect runs only when navigation changes

    return (
        <>
            <View style={styles.container}>
                <Header title={"Chat App"} />
                {selectedtab == 0 ? <User /> : <Setting />}
                <View style={styles.bottomtab}>
                    <TouchableOpacity style={styles.tab} onPress={() => setselectedtab(0)}>
                        <Image style={[styles.tabIcon, { tintColor: selectedtab == 0 ? "white" : "#CCCCCC" }]} source={require("../images/user.png")}></Image>
                        <Text style={[styles.tabtext, { display: selectedtab == 0 ? "flex" : "none" }]}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setselectedtab(1)}>
                        <Image style={[styles.tabIcon, { tintColor: selectedtab == 1 ? "white" : "#CCCCCC" }]} source={require("../images/setting.png")}></Image>
                        <Text style={[styles.tabtext, { display: selectedtab == 1 ? "flex" : "none" }]}>Setting</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    bottomtab: {
        position: "absolute",
        bottom: 0,
        paddingTop: 10,
        paddingBottom: 10,
        width: "100%",
        backgroundColor: "purple",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    tab: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    tabIcon: {
        width: 27,
        height: 27,
    },
    tabtext: {
        color: "white",
        padding: 2
    }

})
export default Home