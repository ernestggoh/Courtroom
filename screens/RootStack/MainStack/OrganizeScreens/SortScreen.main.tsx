import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { Appbar, Button, Card, Avatar, Searchbar } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/firestore";
import { UserModel } from "../../../../models/user.js";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../MainStackScreen.js";
import { RouteProp } from "@react-navigation/native";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "FeedScreen">;
  route: RouteProp<MainStackParamList, "SortScreen">;
}

export default function SortScreen({ navigation, route }: Props) {
  const [lawyers, setLawyers] = useState<UserModel[]>([]);
  const { lawyerList } = route.params;

  useEffect(() => {
    setLawyers(lawyerList);
  }, [lawyerList]);

  const onPressName = () => {
    let data = lawyers;
    data = data.sort((a, b) => a.userNickname.localeCompare(b.userNickname));
    navigation.navigate("FeedScreen", { updatedLawyers: data });
  };

  const onPressCase = () => {
    let data = lawyers;
    data = data.sort((a, b) =>
      a.userTypeOfCase.localeCompare(b.userTypeOfCase)
    );
    navigation.navigate("FeedScreen", { updatedLawyers: data });
  };

  return (
    <View>
      <Button onPress={onPressName}>Name</Button>
      <Button onPress={onPressCase}>Type of Case</Button>
    </View>
  );
}
