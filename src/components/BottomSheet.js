import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import firestore from "@react-native-firebase/firestore"

const BottomSheet = ({ isVisible, handlevisible, userid, asyncname, title, currentvalue }) => {
    const [inputtext, setinputtext] = useState(currentvalue);

    const handlesave = async () => {
        firestore().collection("users").doc(userid).update({ [title]: inputtext }).then(async () => {
            await AsyncStorage.setItem(asyncname, inputtext)
            handlevisible(false)
            setinputtext(""); // Reset input text after saving
        });
    }

    useEffect(() => {
        setinputtext(currentvalue);
    }, [currentvalue, isVisible]);

    return (
        <Modal visible={isVisible} transparent={true} onRequestClose={handlevisible}>
            <View style={styles.modalContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>New {title}</Text>
                        <TouchableOpacity onPress={handlevisible}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setinputtext}
                        value={inputtext}
                        placeholder="Enter text..."
                    />
                    <TouchableOpacity activeOpacity={0.6} style={styles.savebutton} onPress={handlesave}>
                        <Text style={styles.buttontext}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: "capitalize"
    },
    closeButton: {
        color: 'dodgerblue',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    savebutton: {
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: "dodgerblue",
    },
    buttontext: {
        fontSize: 20,
        color: "white"
    }
});

export default BottomSheet;
