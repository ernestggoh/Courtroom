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

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "CommentsScreen">;
  route: RouteProp<MainStackParamList, "CommentsScreen">;
}

export default function CommentsScreen({ route, navigation }: Props) {
  const { social } = route.params;
  const [comments, setComments] = useState<CommentModel[]>([]);

  const currentUserId = firebase.auth().currentUser!.uid;

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("comments")
      .orderBy("commentContent", "asc")
      .onSnapshot((querySnapshot) => {
        var newComments: CommentModel[] = [];
        querySnapshot.forEach((comment) => {
          const newComment = comment.data() as CommentModel;
          if (newComment.socialid === social.id) {
            newComment.id = comment.id;
            newComments.push(newComment);
          }
        });
        setComments(newComments);
      });
    return unsubscribe;
  }, []);

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() =>
            navigation.navigate("DetailScreen", {
              social: social,
            })
          }
        />
        <Appbar.Content title="Comments" />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            navigation.navigate("NewCommentScreen", { social: social });
          }}
        />
      </Appbar.Header>
    );
  };

  // const toggleInterested = (comment: CommentModel) => {
  //   if (!comment.interested) {
  //     comment.interested = {};
  //   }
  //   if (comment.interested[currentUserId]) {
  //     comment.interested[currentUserId] = false;
  //     comment.upvote -= 1;
  //   } else {
  //     comment.upvote += 1;
  //     comment.interested[currentUserId] = true;
  //   }

  //   firebase
  //     .firestore()
  //     .collection("comments")
  //     .doc(comment.id)
  //     .set({
  //       ...comment,
  //       id: null,
  //     })
  //     .then(() => {})
  //     .catch((error) => {
  //       console.log("Error writing node:", error);
  //     });
  // };
  const toggleUpvote = (comment: CommentModel) => {
    if (!comment.upvote) {
      comment.upvote = {};
    }
    if (!comment.downvote) {
      comment.downvote = {};
    }

    if (comment.upvote[currentUserId]) {
      comment.upvote[currentUserId] = false;
      comment.upvotes -= 1;
    } else {
      if (comment.downvote[currentUserId]) {
        comment.upvotes += 2;
      } else {
        comment.upvotes += 1;
      }
      comment.upvote[currentUserId] = true;
      comment.downvote[currentUserId] = false;
    }

    firebase
      .firestore()
      .collection("comments")
      .doc(comment.id)
      .set({
        ...comment,
        id: null,
      })
      .then(() => {})
      .catch((error) => {
        console.log("Error writing node:", error);
      });
  }
  const toggleDownvote = (comment: CommentModel) => {
    if (!comment.downvote) {
      comment.downvote = {};
    }
    if (!comment.upvote) {
      comment.upvote = {};
    }

    if (comment.downvote[currentUserId]) {
      comment.downvote[currentUserId] = false;
      comment.upvotes += 1;
    } else {
      if (comment.upvote[currentUserId]) {
        comment.upvotes -= 2;
      } else {
        comment.upvotes -= 1;
      }
      comment.downvote[currentUserId] = true;
      comment.upvote[currentUserId] = false;
    }

    firebase
      .firestore()
      .collection("comments")
      .doc(comment.id)
      .set({
        ...comment,
        id: null,
      })
      .then(() => {})
      .catch((error) => {
        console.log("Error writing node:", error);
      });
  }

  const deleteComment = (comment: CommentModel) => {
    firebase.firestore().collection("comments").doc(comment.id).delete();
  };

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={{ color: "gray", margin: 30, textAlign: "center" }}>
          {
            "Welcome! To get started, use the plus button in the top-right corner to create a new comment."
          }
        </Text>
      </View>
    );
  };

  const renderSocial = ({ item }: { item: CommentModel }) => {
    // const onPress = () => {
    //   navigation.navigate("DetailScreen", {
    //     social: item,
    //   });
    // };

    return (
      <Card style={{ margin: 16 }}>
        <Card.Title
          title={item.commentContent}
          // right={(props) => (
          //   <Text style={{ color: "blue", fontSize: 15 }}>
          //     {item.upvote + " likes"}
          //   </Text>
          // )}
        />

        <Card.Actions>
          <Button onPress={() => toggleUpvote(item)}>
            {item.upvote && item.upvote[currentUserId]
              ? "⬆"
              : "⇧"}
          </Button>
          <Button>
            {item.upvotes}
          </Button>
          <Button onPress={() => toggleDownvote(item)}>
            {item.downvote && item.downvote[currentUserId]
              ? "⬇"
              : "⇩"}
          </Button>
          {item.owner === currentUserId && (
            <Button color="red" onPress={() => deleteComment(item)}>
              {"Delete"}
            </Button>
          )}
        </Card.Actions>
      </Card>
    );
  };

  return (
    <>
      <Bar />
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <FlatList
            data={comments}
            renderItem={renderSocial}
            keyExtractor={(_, index) => "key-" + index}
            ListEmptyComponent={ListEmptyComponent}
          />
        </View>
      </ScrollView>
    </>
  );
}
