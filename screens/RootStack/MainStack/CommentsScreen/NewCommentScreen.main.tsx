import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { ScrollView, Image, Text, View, FlatList } from "react-native";
import { Appbar, Button, Card, TextInput } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./CommentsScreen.styles";
import { CommentModel } from "../../../../models/comment.js";
import { GiftedChat } from 'react-native-gifted-chat';

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "CommentsScreen">;
  route: RouteProp<MainStackParamList, "CommentsScreen">;
}

export default function NewCommentScreen({ navigation, route }: Props) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])



  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.Action onPress={navigation.goBack} icon="close" />
        <Appbar.Content title="Messages Screen" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <GiftedChat
      messages={messages}
      onSend={(messages: any) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
      {/* <View style={{ ...styles.container, padding: 20 }}>
        <Text>This is our messages screen</Text>
      </View> */}
    </>
  );
}
