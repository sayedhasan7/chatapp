import { View, Text, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';

const Chat = ({ navigation }) => {
    const [messageList, setMessageList] = useState([]);
    const route = useRoute();

    useEffect(() => {
        const subscriber = firestore()
            .collection('chats')
            .doc(route.params.id + route.params.data.email)
            .collection('messages')
            .orderBy('createdAt', 'desc');
        subscriber.onSnapshot(querysnapshot => {
            const allmessages = querysnapshot.docs.map(item => {
                return { ...item._data, createdAt: item._data.createdAt };
            });
            setMessageList(allmessages);
        });
        return () => {
            subscriber
        };
    }, []);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            // Navigate to the "Home" screen when the back button is pressed
            navigation.navigate("Home");
            return true; // Prevent default back button behavior
        });

        return () => backHandler.remove(); // Cleanup function to remove the event listener
    }, [navigation]);

    
    const onSend = useCallback(async (messages = []) => {
        const msg = messages[0];
        const myMsg = {
            ...msg,
            sendBy: route.params.id,
            sendTo: route.params.data.email,
            createdAt: Date.parse(msg.createdAt),
        };
        setMessageList(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        );
        firestore()
            .collection('chats')
            .doc('' + route.params.id + route.params.data.email)
            .collection('messages')
            .add(myMsg);
        firestore()
            .collection('chats')
            .doc('' + route.params.data.email + route.params.id)
            .collection('messages')
            .add(myMsg);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Header title={route.params.data.name} />
            <GiftedChat
                messages={messageList}
                onSend={messages => onSend(messages)}
                user={{
                    _id: route.params.id,
                }}
            />
        </View>
    );
};

export default Chat;