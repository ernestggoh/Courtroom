import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { UserModel } from "../../../../models/user";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./DetailScreen.styles";
import firebase from "firebase/app";
import "firebase/firestore";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "DetailScreen">;
  route: RouteProp<MainStackParamList, "DetailScreen">;
}

export default function DetailScreen({ route, navigation }: Props) {
  const { user } = route.params;
  const currentUserId = firebase.auth().currentUser!.uid;

  const toggleInterested = (user: UserModel) => {
    if (!user.interested) {
      user.interested = {};
    }
    if (user.interested[currentUserId]) {
      user.interested[currentUserId] = false;
    } else {
      user.interested[currentUserId] = true;
    }

    firebase
      .firestore()
      .collection("lawyers")
      .doc(user.id)
      .set({
        ...user,
        id: null,
      })
      .then(() => {})
      .catch((error) => {
        console.log("Error writing node:", error);
      });
  };

  const Bar = () => {
    return (
      <Appbar.Header style={{backgroundColor: "#FFFFFF"}}>
        <Appbar.BackAction onPress={() => navigation.navigate("FeedScreen")} />
        <Appbar.Content title={<Text style={{fontSize: 20, color: "#00F0FF"}}>Courtroom</Text>} />
        <Appbar.Action
          icon="star"
          onPress={() => {
            toggleInterested(user);
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
          <Image style={styles.image} source={{ uri: user.userImage }} />
          <Text style={{ ...styles.h1, marginVertical: 10 }}>
            {user.userNickname}
          </Text>
          <Text style={{ ...styles.subtitle, marginBottom: 5 }}>
            {"Location: " + user.userLocation}
          </Text>
          <Text style={{ ...styles.subtitle, marginTop: 5, marginBottom: 20 }}>
            {"Type of Case: " + user.userTypeOfCase}
          </Text>
          <Text style={{ ...styles.subtitle, marginTop: 0, marginBottom: 20 }}>
            {"About: " + user.userAbout}
          </Text>
          {/* <Button
            color="blue"
            onPress={() =>
              navigation.navigate("CommentsScreen", {
                social: social,
              })
            }
          > */}
          {/* {"Comments"}
          </Button> */}
        </View>
      </ScrollView>
    </>
  );
}
