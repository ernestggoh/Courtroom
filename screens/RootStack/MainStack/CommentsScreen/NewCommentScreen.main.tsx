import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { ScrollView, Image, Text, View, FlatList } from "react-native";
import { Appbar, Button, Card, TextInput } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./CommentsScreen.styles";
import { CommentModel } from "../../../../models/comment.js";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "CommentsScreen">;
  route: RouteProp<MainStackParamList, "CommentsScreen">;
}

export default function NewCommentScreen({ route, navigation }: Props) {
  const { social } = route.params;
  // Event details.
  const [comment, setComment] = useState("");

  // Snackbar.
  const [message, setMessage] = useState("");
  // Loading state for submit button
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // Code for SnackBar (from docs)
  const onDismissSnackBar = () => setVisible(false);
  const showError = (error: string) => {
    setMessage(error);
    setVisible(true);
  };

  // This method is called AFTER all fields have been validated.
  const saveEvent = async () => {
    if (!comment) {
      showError("Please enter a comment.");
      return;
    } else {
      setLoading(true);
    }

    try {
      // Generate a brand new doc ID by calling .doc() on the socials node.
      const socialRef = firebase.firestore().collection("comments").doc();

      const doc: CommentModel = {
        commentContent: comment,
        socialid: social.id || "",
        owner: firebase.auth().currentUser!.uid,
        interested: {},
        upvotes: 0,
      };
      console.log("setting download url");
      await socialRef.set(doc);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      showError(error.toString());
    }
  };

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.Action onPress={navigation.goBack} icon="close" />
        <Appbar.Content title="Schedule Rater" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <View style={{ ...styles.container, padding: 20 }}>
        <TextInput
          label="Comment"
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        <Button
          mode="contained"
          onPress={saveEvent}
          style={{ marginTop: 20 }}
          loading={loading}
        >
          Save Comment
        </Button>
      </View>
    </>
  );
}
