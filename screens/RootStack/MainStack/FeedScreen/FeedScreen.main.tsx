import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { Appbar, Button, Card, Avatar, Searchbar } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/firestore";
import { UserModel } from "../../../../models/user.js";
import { styles } from "./FeedScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { FeedStackParamList } from "../MainStackScreen.js";

interface Props {
  navigation: StackNavigationProp<FeedStackParamList, "FeedScreen">;
}

export default function FeedScreen({ navigation }: Props) {
  // List of user objects
  // I am starting with Cilent Point of View, displaying Lawyers
  /*TODO insert if-else clause to deal with lawyer point of view */
  const [lawyers, setLawyers] = useState<UserModel[]>([]);
  const [search, setSearch] = useState("");

  const currentUserId = firebase.auth().currentUser!.uid;

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("lawyers")
      .orderBy("userNickname", "asc")
      .onSnapshot((querySnapshot) => {
        var newLawyers: UserModel[] = [];
        querySnapshot.forEach((lawyer) => {
          const newLawyer = lawyer.data() as UserModel;
          newLawyer.id = lawyer.id;
          newLawyers.push(newLawyer);
        });
        setLawyers(newLawyers);
      });
    return unsubscribe;
  }, []);

  const deleteSocial = (social: UserModel) => {
    firebase.firestore().collection("socials").doc(social.id).delete();
  };

  const renderSocial = ({ item }: { item: UserModel }) => {
    const onPress = () => {
      navigation.navigate("DetailScreen", {
        user: item,
      });
    };

    let meetsSearchCriteria =
      search.trim() == "" ||
      item.userNickname.toLowerCase().includes(search.trim().toLowerCase());
    // let meetsActorsCriteria =
    //   actors.length == 0 || overlapFound(actors, item.actors);
    if (meetsSearchCriteria) {
      return (
        <Card onPress={onPress} style={{ margin: 16 }}>
          <Card.Title
            title={item.userNickname}
            subtitle={item.userLocation + " • " + item.userTypeOfCase + " Units"}
            left={(props) => <Avatar.Image size={50} source={{ uri: item.userImage }} />}
          />
        </Card>
      );
    } else {
      // If the item doesn't meet search/filter criteria, then we can
      // simply return null and it won't be rendered in the list!
      return null;
    }
  };

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.Action
          icon="exit-to-app"
          onPress={() => firebase.auth().signOut()}
        />
        <Appbar.Content title="Courtroom" />
        <Appbar.Action
          icon="account"
          onPress={() => {
            navigation.navigate("NewSocialScreen");
          }}
        />
      </Appbar.Header>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={{ color: "gray", margin: 30, textAlign: "center" }}>
          {
            "Welcome! To get started, use the plus button in the top-right corner to create a new social."
          }
        </Text>
      </View>
    );
  };

  return (
    <>
      <Bar />
      <View style={styles.container}>
        <Searchbar
          placeholder="Type Here..."
          onChangeText={setSearch}
          value={search}
        />
        <FlatList
          data={lawyers}
          renderItem={renderSocial}
          keyExtractor={(_, index) => "key-" + index}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </>
  );
}
