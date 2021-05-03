import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { ScrollView, Image, Text, View, FlatList } from "react-native";
import { Appbar, Button, Card, IconButton } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./CommentsScreen.styles";
import { CommentModel } from "../../../../models/comment.js";
import { MessageModel } from "../../../../models/message.js";
import { ChatModel } from "../../../../models/chat.js";
// import * as Notifications from "expo-notifications";
// import * as BackendAPI from "../../../../api/backend";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "CommentsScreen">;
  route: RouteProp<MainStackParamList, "CommentsScreen">;
}

export default function CommentsScreen({ navigation, route }: Props) {

  const Bar = () => {
    return (
      <Appbar.Header style={{backgroundColor: "#FFFFFF"}}>
        <Appbar.Content title={<Text style={{fontSize: 20, color: "#00F0FF"}}>Courtroom</Text>} />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            navigation.navigate("NewCommentScreen");
          }}
        />
      </Appbar.Header>
    );
  };


  return (
    <>
      <Bar />
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <Text> This is our chat screen</Text>
          <Button onPress={() => {
            navigation.navigate("NewCommentScreen");
          }}>Go to message screen</Button>
        </View>
      </ScrollView>
    </>
  );
}
