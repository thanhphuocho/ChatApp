import React from 'react';
import { View, Text } from 'react-native';
import { Message } from '../types/message';

type Props = {
    userId: string | undefined;
    item: Message;
};

export const MessageItem: React.FC<Props> = ({ item, userId }: Props) => {
    return (
        <View
            style={
                userId == item.userId
                    ? {
                          alignSelf: 'flex-end',
                          backgroundColor: '#007AFF',
                          padding: 5,
                          borderRadius: 5,
                          borderTopRightRadius: 0,
                          marginBottom: 5
                      }
                    : {
                          alignSelf: 'flex-start',
                          backgroundColor: '#fff',
                          padding: 5,
                          borderRadius: 5,
                          borderTopLeftRadius: 0,
                          marginBottom: 5
                      }
            }
        >
            <Text style={userId == item.userId ? { color: '#fff' } : {}}>
                {item.text}
            </Text>
        </View>
    );
};