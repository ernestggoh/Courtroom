import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { Appbar, Button, Card, Avatar, Searchbar } from "react-native-paper";
import firebase, { firestore } from "firebase/app";
import "firebase/firestore";
import { UserModel } from "../../../../models/user.js";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../MainStackScreen.js";
import { RouteProp } from "@react-navigation/native";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "FeedScreen">;
  route: RouteProp<MainStackParamList, "SavedScreen">;
}

export default function SavedScreen({ navigation, route }: Props) {
  const [lawyers, setLawyers] = useState<UserModel[]>([]);
  const [savedLawyers, setSavedLawyers] = useState<UserModel[]>([]);
  const { lawyerList } = route.params;
  const currentUserId = firebase.auth().currentUser!.uid;

  useEffect(() => {
    let data = lawyerList;
    data = data.filter((item) => item.interested[currentUserId] == true);
    setSavedLawyers(data);
  }, [lawyerList]);

  const renderSocial = ({ item }: { item: UserModel }) => {
    const onPress = () => {
      navigation.navigate("DetailScreen", {
        user: item,
      });
    };
    return (
      <Card onPress={onPress} style={{ margin: 16 }}>
        <Card.Title
          title={item.userNickname}
          subtitle={item.userLocation + " • " + item.userTypeOfCase + " Units"}
          left={(props) => (
            <Avatar.Image size={50} source={{ uri: item.userImage }} />
          )}
        />
      </Card>
    );
  };

  const goBack = () => {
    navigation.navigate("FeedScreen");
  };
  return (
    <View>
      <FlatList
        data={savedLawyers}
        renderItem={renderSocial}
        keyExtractor={(_, index) => "key-" + index}
      />
    </View>
  );
}
