//screens/ChatScreen.tsx

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    Button,
    FlatList,
    Alert,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import { getMessageDocRef, getUserId } from '../lib/firebase';
import { Message } from '../types/message';

export const ChatScreen = () => {
    const [text, setText] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [userId, setUserId] = useState<string | undefined>();

    const sendMessage = async (value: string, uid: string | undefined) => {
        if (value != '') {
            const docRef = await getMessageDocRef();
            const newMessage = {
                text: value,
                createdAt: firebase.firestore.Timestamp.now(),
                userId: uid
            } as Message;
            await docRef.set(newMessage);
            setText('');
        } else {
            Alert.alert('エラー', 'メッセージを入力してください');
        }
    };

    const getMessages = async () => {
        const messages = [] as Message[];
        await firebase
            .firestore()
            .collection('messages')
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        messages.unshift(change.doc.data() as Message);
                    }
                });
                setMessages(messages);
            });
    };

    const signin = async () => {
        const uid = await getUserId();
        setUserId(uid);
    };

    useEffect(() => {
        signin();
        getMessages();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ExpoStatusBar style="light" />
            <KeyboardAvoidingView behavior="padding">
                <FlatList
                    style={styles.messagesContainer}
                    data={messages}
                    inverted={true}
                    renderItem={({ item }: { item: Message }) => (
                        <Text style={{ color: '#fff' }}>{item.text}</Text>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                />
                <View style={styles.inputTextContainer}>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(value) => {
                            setText(value);
                        }}
                        value={text}
                        placeholder="メッセージを入力してください"
                        placeholderTextColor="#777"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                    />
                    <Button
                        title="send"
                        onPress={() => {
                            sendMessage(text, userId);
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messagesContainer: {
        width: '100%',
        padding: 10
    },
    inputTextContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText: {
        color: '#fff',
        borderWidth: 1,
        borderColor: '#999',
        height: 32,
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 10
    }
});
export default ChatScreen